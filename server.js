import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, unlinkSync, createReadStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import mime from 'mime';

// Configure ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Ensure tmp directories exist
const TMP_DIR = path.join(__dirname, 'tmp');
const UPLOAD_DIR = path.join(TMP_DIR, 'uploads');
const OUTPUT_DIR = path.join(TMP_DIR, 'outputs');
for (const dir of [TMP_DIR, UPLOAD_DIR, OUTPUT_DIR]) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const id = uuidv4();
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `${id}${ext}`);
  }
});
const upload = multer({ storage });

// Helpers to map options to ffmpeg filters
function buildFilterGraph(options) {
  const filters = [];

  // Denoise
  const denoiseLevel = options?.denoiseLevel || 'none';
  if (denoiseLevel !== 'none') {
    const levelToVals = {
      low: 'hqdn3d=1.5:1.5:6:6',
      medium: 'hqdn3d=3:3:9:9',
      high: 'hqdn3d=6:6:12:12'
    };
    const v = levelToVals[denoiseLevel] || levelToVals.medium;
    filters.push(v);
  }

  // Sharpen
  const sharpenLevel = options?.sharpenLevel || 'none';
  if (sharpenLevel !== 'none') {
    const levelToVals = {
      low: 'unsharp=3:3:0.5:3:3:0.0',
      medium: 'unsharp=5:5:1.0:5:5:0.0',
      high: 'unsharp=7:7:2.0:7:7:0.0'
    };
    filters.push(levelToVals[sharpenLevel] || levelToVals.medium);
  }

  // Brightness/contrast
  const brightness = Number(options?.brightness ?? 0); // -1..1 (mapped)
  const contrast = Number(options?.contrast ?? 0); // -1..1 (mapped)
  if (brightness !== 0 || contrast !== 0) {
    // Map -1..1 to ffmpeg eq: brightness -1..1, contrast 0..2.0
    const eqBrightness = Math.max(-1, Math.min(1, brightness));
    const eqContrast = Math.max(0, Math.min(2, 1 + contrast));
    filters.push(`eq=brightness=${eqBrightness}:contrast=${eqContrast}`);
  }

  // Saturation
  const saturation = Number(options?.saturation ?? 0); // -1..1
  if (saturation !== 0) {
    const sat = Math.max(0, Math.min(3, 1 + saturation));
    filters.push(`eq=saturation=${sat}`);
  }

  // Upscale
  const upscale = options?.upscale || 'none';
  if (upscale !== 'none') {
    const targetToSize = {
      '720p': '1280:720',
      '1080p': '1920:1080',
      '1440p': '2560:1440',
      '4k': '3840:2160'
    };
    const size = targetToSize[upscale];
    if (size) {
      filters.push(`scale=${size}:flags=lanczos`);
    }
  }

  const vf = filters.join(',');
  return vf;
}

// Enhance endpoint
app.post('/api/enhance', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video uploaded' });
    }

    const options = {
      denoiseLevel: req.body?.denoiseLevel,
      sharpenLevel: req.body?.sharpenLevel,
      brightness: req.body?.brightness,
      contrast: req.body?.contrast,
      saturation: req.body?.saturation,
      upscale: req.body?.upscale
    };

    const inputPath = req.file.path;
    const id = path.parse(req.file.filename).name + '-' + uuidv4();
    const outExt = '.mp4';
    const outputPath = path.join(OUTPUT_DIR, `${id}${outExt}`);

    const vf = buildFilterGraph(options);

    const command = ffmpeg(inputPath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions([
        '-preset', process.env.FFMPEG_PRESET || 'medium',
        '-crf', process.env.FFMPEG_CRF || '20',
        '-movflags', 'faststart'
      ])
      .format('mp4')
      .on('start', cmd => {
        // eslint-disable-next-line no-console
        console.log('ffmpeg start:', cmd);
      })
      .on('error', err => {
        // eslint-disable-next-line no-console
        console.error('ffmpeg error:', err.message);
      })
      .on('end', () => {
        // cleanup input after processing
        try { unlinkSync(inputPath); } catch {}
      })
      .save(outputPath);

    if (vf) {
      command.videoFilters(vf);
    }

    command.on('end', () => {
      const downloadUrl = `/api/download/${path.basename(outputPath)}`;
      res.json({ id, downloadUrl });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Failed to enhance video' });
  }
});

// Download endpoint
app.get('/api/download/:file', (req, res) => {
  try {
    const base = path.basename(req.params.file);
    const filePath = path.join(OUTPUT_DIR, base);
    if (!existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    const mimeType = mime.getType(filePath) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="enhanced-${base}"`);
    const stream = createReadStream(filePath);
    stream.pipe(res);
    stream.on('close', () => {
      try { unlinkSync(filePath); } catch {}
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});

