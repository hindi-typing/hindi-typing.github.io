// English to Hindi Transliteration Mapping
const transliterationMap = {
    // Vowels
    'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
    'ri': 'ऋ', 'rri': 'ॠ', 'lri': 'ऌ', 'llri': 'ॡ',
    
    // Consonants
    'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'nga': 'ङ',
    'cha': 'च', 'chha': 'छ', 'ja': 'ज', 'jha': 'झ', 'nja': 'ञ',
    'ta': 'ट', 'tha': 'ठ', 'da': 'ड', 'dha': 'ढ', 'na': 'ण',
    'ta': 'त', 'tha': 'थ', 'da': 'द', 'dha': 'ध', 'na': 'न',
    'pa': 'प', 'pha': 'फ', 'ba': 'ब', 'bha': 'भ', 'ma': 'म',
    'ya': 'य', 'ra': 'र', 'la': 'ल', 'va': 'व', 'wa': 'व',
    'sha': 'श', 'shha': 'ष', 'sa': 'स', 'ha': 'ह',
    'ksha': 'क्ष', 'tra': 'त्र', 'gya': 'ज्ञ',
    
    // Consonants without vowels
    'k': 'क्', 'kh': 'ख्', 'g': 'ग्', 'gh': 'घ्', 'ng': 'ङ्',
    'ch': 'च्', 'chh': 'छ्', 'j': 'ज्', 'jh': 'झ्', 'nj': 'ञ्',
    't': 'त्', 'th': 'थ्', 'd': 'द्', 'dh': 'ध्', 'n': 'न्',
    'p': 'प्', 'ph': 'फ्', 'b': 'ब्', 'bh': 'भ्', 'm': 'म्',
    'y': 'य्', 'r': 'र्', 'l': 'ल्', 'v': 'व्', 'w': 'व्',
    'sh': 'श्', 'shh': 'ष्', 's': 'स्', 'h': 'ह्',
    
    // Special characters
    'om': 'ॐ', 'aum': 'ॐ',
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
};

// Vowel matras (diacritics)
const vowelMatras = {
    'aa': 'ा', 'i': 'ि', 'ii': 'ी', 'u': 'ु', 'uu': 'ू',
    'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ',
    'ri': 'ृ', 'rri': 'ॄ', 'lri': 'ॢ', 'llri': 'ॣ'
};

// Common word mappings for better accuracy
const commonWords = {
    'namaste': 'नमस्ते',
    'bharat': 'भारत',
    'india': 'भारत',
    'sanskrit': 'संस्कृत',
    'yoga': 'योग',
    'guru': 'गुरु',
    'mantra': 'मंत्र',
    'dharma': 'धर्म',
    'karma': 'कर्म',
    'moksha': 'मोक्ष',
    'ahimsa': 'अहिंसा',
    'satyagraha': 'सत्याग्रह',
    'mahatma': 'महात्मा',
    'gandhi': 'गांधी',
    'delhi': 'दिल्ली',
    'mumbai': 'मुंबई',
    'kolkata': 'कोलकाता',
    'chennai': 'चेन्नई',
    'bangalore': 'बैंगलोर',
    'hyderabad': 'हैदराबाद',
    'pune': 'पुणे',
    'ahmedabad': 'अहमदाबाद',
    'surat': 'सूरत',
    'jaipur': 'जयपुर',
    'lucknow': 'लखनऊ',
    'kanpur': 'कानपुर',
    'nagpur': 'नागपुर',
    'indore': 'इंदौर',
    'thane': 'ठाणे',
    'bhopal': 'भोपाल',
    'visakhapatnam': 'विशाखापत्तनम',
    'pimpri': 'पिंपरी',
    'patna': 'पटना',
    'vadodara': 'वडोदरा',
    'ghaziabad': 'गाजियाबाद',
    'ludhiana': 'लुधियाना',
    'agra': 'आगरा',
    'nashik': 'नाशिक',
    'faridabad': 'फरीदाबाद',
    'meerut': 'मेरठ',
    'rajkot': 'राजकोट',
    'kalyan': 'कल्याण',
    'vasai': 'वसई',
    'varanasi': 'वाराणसी',
    'srinagar': 'श्रीनगर',
    'aurangabad': 'औरंगाबाद',
    'dhanbad': 'धनबाद',
    'amritsar': 'अमृतसर',
    'navi': 'नवी',
    'allahabad': 'इलाहाबाद',
    'prayagraj': 'प्रयागराज',
    'howrah': 'हावड़ा',
    'ranchi': 'रांची',
    'gwalior': 'ग्वालियर',
    'jabalpur': 'जबलपुर',
    'coimbatore': 'कोयंबटूर'
};

// DOM Elements
const englishInput = document.getElementById('englishInput');
const hindiOutput = document.getElementById('hindiOutput');
const clearInputBtn = document.getElementById('clearInput');
const clearOutputBtn = document.getElementById('clearOutput');
const copyOutputBtn = document.getElementById('copyOutput');
const inputCount = document.getElementById('inputCount');
const outputCount = document.getElementById('outputCount');
const exampleItems = document.querySelectorAll('.example-item');

// Transliteration function
function transliterate(text) {
    if (!text) return '';
    
    // Convert to lowercase for processing
    let processedText = text.toLowerCase();
    
    // Check for common words first
    const words = processedText.split(/\s+/);
    const transliteratedWords = words.map(word => {
        // Remove punctuation for word matching
        const cleanWord = word.replace(/[^\w]/g, '');
        if (commonWords[cleanWord]) {
            // Preserve original punctuation
            return word.replace(cleanWord, commonWords[cleanWord]);
        }
        return transliterateWord(word);
    });
    
    return transliteratedWords.join(' ');
}

function transliterateWord(word) {
    let result = '';
    let i = 0;
    
    while (i < word.length) {
        let matched = false;
        
        // Try to match longer patterns first
        for (let len = 4; len >= 1; len--) {
            if (i + len <= word.length) {
                const substr = word.substr(i, len);
                
                if (transliterationMap[substr]) {
                    result += transliterationMap[substr];
                    i += len;
                    matched = true;
                    break;
                }
            }
        }
        
        // If no match found, try vowel matras for consonant-vowel combinations
        if (!matched && i < word.length) {
            const char = word[i];
            
            // Check if it's a consonant followed by a vowel
            if (i > 0 && transliterationMap[char] && vowelMatras[char]) {
                // Remove the inherent 'a' from previous consonant and add matra
                if (result.endsWith('्')) {
                    result = result.slice(0, -1); // Remove halant
                }
                result += vowelMatras[char];
                i++;
                matched = true;
            } else if (transliterationMap[char]) {
                result += transliterationMap[char];
                i++;
                matched = true;
            }
        }
        
        // If still no match, keep the original character
        if (!matched) {
            result += word[i];
            i++;
        }
    }
    
    return result;
}

// Real-time transliteration
englishInput.addEventListener('input', function() {
    const inputText = this.value;
    const transliteratedText = transliterate(inputText);
    
    hindiOutput.value = transliteratedText;
    
    // Update character counts
    inputCount.textContent = inputText.length;
    outputCount.textContent = transliteratedText.length;
});

// Clear input
clearInputBtn.addEventListener('click', function() {
    englishInput.value = '';
    hindiOutput.value = '';
    inputCount.textContent = '0';
    outputCount.textContent = '0';
    englishInput.focus();
});

// Clear output
clearOutputBtn.addEventListener('click', function() {
    hindiOutput.value = '';
    outputCount.textContent = '0';
});

// Copy to clipboard
copyOutputBtn.addEventListener('click', async function() {
    const outputText = hindiOutput.value;
    
    if (!outputText) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(outputText);
        
        // Visual feedback
        this.classList.add('copy-success');
        const originalIcon = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            this.classList.remove('copy-success');
            this.innerHTML = originalIcon;
        }, 1000);
        
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = outputText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Visual feedback
        this.classList.add('copy-success');
        const originalIcon = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            this.classList.remove('copy-success');
            this.innerHTML = originalIcon;
        }, 1000);
    }
});

// Example items click handlers
exampleItems.forEach(item => {
    item.addEventListener('click', function() {
        const englishText = this.dataset.english;
        const hindiText = this.dataset.hindi;
        
        englishInput.value = englishText;
        hindiOutput.value = hindiText;
        
        inputCount.textContent = englishText.length;
        outputCount.textContent = hindiText.length;
        
        // Scroll to input area
        englishInput.scrollIntoView({ behavior: 'smooth' });
        englishInput.focus();
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+L or Cmd+L to clear input
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearInputBtn.click();
    }
    
    // Ctrl+C or Cmd+C when output is focused to copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === hindiOutput) {
        copyOutputBtn.click();
    }
});

// Initialize character counts
document.addEventListener('DOMContentLoaded', function() {
    inputCount.textContent = '0';
    outputCount.textContent = '0';
});

// Enhanced transliteration with better consonant-vowel handling
function enhancedTransliterate(text) {
    if (!text) return '';
    
    let result = '';
    const words = text.toLowerCase().split(/(\s+)/);
    
    for (let word of words) {
        if (/^\s+$/.test(word)) {
            result += word;
            continue;
        }
        
        // Check common words first
        const cleanWord = word.replace(/[^\w]/g, '');
        if (commonWords[cleanWord]) {
            result += word.replace(cleanWord, commonWords[cleanWord]);
            continue;
        }
        
        // Process character by character with lookahead
        let i = 0;
        while (i < word.length) {
            let matched = false;
            
            // Try longer patterns first (4, 3, 2, 1 characters)
            for (let len = Math.min(4, word.length - i); len >= 1; len--) {
                const substr = word.substr(i, len);
                
                if (transliterationMap[substr]) {
                    result += transliterationMap[substr];
                    i += len;
                    matched = true;
                    break;
                }
            }
            
            if (!matched) {
                result += word[i];
                i++;
            }
        }
    }
    
    return result;
}

// Update the input event listener to use enhanced transliteration
englishInput.removeEventListener('input', englishInput.oninput);
englishInput.addEventListener('input', function() {
    const inputText = this.value;
    const transliteratedText = enhancedTransliterate(inputText);
    
    hindiOutput.value = transliteratedText;
    
    // Update character counts
    inputCount.textContent = inputText.length;
    outputCount.textContent = transliteratedText.length;
});