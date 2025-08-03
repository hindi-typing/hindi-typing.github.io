# English to Hindi Transliteration Website

A modern, responsive web application that converts English text to Hindi (Devanagari) script using transliteration rules. This tool is perfect for typing Hindi text using English characters.

## Features

- **Real-time Transliteration**: Instant conversion as you type
- **Comprehensive Mapping**: Supports vowels, consonants, and special characters
- **Common Words Database**: Includes pre-mapped common Hindi words and Indian city names
- **Modern UI**: Beautiful gradient design with smooth animations
- **Mobile Responsive**: Works perfectly on all devices
- **Copy to Clipboard**: One-click copy functionality
- **Character Counter**: Real-time character count for both input and output
- **Keyboard Shortcuts**: Quick access with keyboard shortcuts
- **Example Words**: Click-to-try example words

## How to Use

1. **Open the Website**: Open `index.html` in your web browser
2. **Type English Text**: Enter English text in the left textarea
3. **View Hindi Output**: The Hindi transliteration appears instantly in the right textarea
4. **Copy Result**: Click the copy button to copy the Hindi text to clipboard
5. **Try Examples**: Click on example words below to see how they work

## Transliteration Examples

| English | Hindi | Pronunciation |
|---------|-------|---------------|
| namaste | नमस्ते | Namaste |
| bharat | भारत | Bharat |
| sanskrit | संस्कृत | Sanskrit |
| yoga | योग | Yoga |
| guru | गुरु | Guru |
| mantra | मंत्र | Mantra |
| dharma | धर्म | Dharma |
| karma | कर्म | Karma |

## Supported Characters

### Vowels
- `a` → अ, `aa` → आ, `i` → इ, `ii` → ई
- `u` → उ, `uu` → ऊ, `e` → ए, `ai` → ऐ
- `o` → ओ, `au` → औ, `ri` → ऋ

### Consonants
- `ka` → क, `kha` → ख, `ga` → ग, `gha` → घ
- `cha` → च, `chha` → छ, `ja` → ज, `jha` → झ
- `ta` → त, `tha` → थ, `da` → द, `dha` → ध
- `pa` → प, `pha` → फ, `ba` → ब, `bha` → भ
- `ma` → म, `ya` → य, `ra` → र, `la` → ल
- `va` → व, `sha` → श, `sa` → स, `ha` → ह

### Special Characters
- `om` or `aum` → ॐ
- Numbers: `0-9` → ०-९

## Keyboard Shortcuts

- **Ctrl+L** (or Cmd+L): Clear input field
- **Ctrl+C** (or Cmd+C): Copy output when focused on output field

## Technical Details

### Files Structure
```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript transliteration logic
└── README.md           # Documentation
```

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No external dependencies
- **Font Awesome**: Icons
- **Google Fonts**: Poppins font family

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Installation & Setup

1. **Clone or Download**: Get all the files in a folder
2. **Open Locally**: Simply open `index.html` in your web browser
3. **Or Use HTTP Server**: 
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

## Customization

### Adding New Words
To add new common words, edit the `commonWords` object in `script.js`:

```javascript
const commonWords = {
    'newword': 'नया_शब्द',
    // Add more words here
};
```

### Modifying Transliteration Rules
Edit the `transliterationMap` object in `script.js` to modify or add new character mappings.

### Styling Changes
Modify `styles.css` to change colors, fonts, or layout. The CSS uses custom properties for easy theming.

## Contributing

Feel free to contribute by:
- Adding more common words
- Improving transliteration accuracy
- Enhancing the UI/UX
- Adding new features
- Fixing bugs

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---

**Note**: This tool provides phonetic transliteration and may not be 100% accurate for all words. For professional or academic use, please verify the output with native speakers or authoritative sources.