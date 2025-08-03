// Working English to Hindi Transliteration System

// Word database for exact matches and suggestions
const wordDatabase = {
    // Common greetings
    'namaste': 'नमस्ते', 'namaskar': 'नमस्कार', 'pranam': 'प्रणाम',
    'dhanyawad': 'धन्यवाद', 'shukriya': 'शुक्रिया', 'alvida': 'अलविदा',
    
    // Spiritual terms
    'yoga': 'योग', 'guru': 'गुरु', 'mantra': 'मंत्र', 'dharma': 'धर्म',
    'karma': 'कर्म', 'moksha': 'मोक्ष', 'ahimsa': 'अहिंसा', 'satya': 'सत्य',
    'shanti': 'शांति', 'bhakti': 'भक्ति', 'seva': 'सेवा', 'dhyan': 'ध्यान',
    
    // Languages
    'sanskrit': 'संस्कृत', 'hindi': 'हिंदी', 'urdu': 'उर्दू',
    'bengali': 'बंगाली', 'tamil': 'तमिल', 'marathi': 'मराठी',
    
    // Places
    'bharat': 'भारत', 'india': 'भारत', 'hindustan': 'हिंदुस्तान',
    'delhi': 'दिल्ली', 'mumbai': 'मुंबई', 'kolkata': 'कोलकाता',
    'chennai': 'चेन्नई', 'bangalore': 'बैंगलोर', 'hyderabad': 'हैदराबाद',
    'pune': 'पुणे', 'jaipur': 'जयपुर', 'agra': 'आगरा', 'varanasi': 'वाराणसी',
    
    // Family
    'mata': 'माता', 'pita': 'पिता', 'maa': 'माँ', 'papa': 'पापा',
    'bhai': 'भाई', 'behan': 'बहन', 'beta': 'बेटा', 'beti': 'बेटी',
    
    // Common words
    'ghar': 'घर', 'paani': 'पानी', 'khana': 'खाना', 'kaam': 'काम',
    'din': 'दिन', 'raat': 'रात', 'subah': 'सुबह', 'shaam': 'शाम',
    'aaj': 'आज', 'kal': 'कल', 'yaha': 'यहाँ', 'waha': 'वहाँ',
    
    // Colors
    'safed': 'सफेद', 'kala': 'काला', 'lal': 'लाल', 'neela': 'नीला',
    'hara': 'हरा', 'peela': 'पीला', 'gulabi': 'गुलाबी',
    
    // Numbers
    'ek': 'एक', 'do': 'दो', 'teen': 'तीन', 'char': 'चार', 'panch': 'पांच',
    'chhe': 'छह', 'saat': 'सात', 'aath': 'आठ', 'nau': 'नौ', 'das': 'दस',
    
    // People
    'gandhi': 'गांधी', 'nehru': 'नेहरू', 'shivaji': 'शिवाजी',
    
    // Festivals
    'diwali': 'दिवाली', 'holi': 'होली', 'dussehra': 'दशहरा',
    'rakhi': 'राखी', 'karwachauth': 'करवाचौथ',
    
    // Deities
    'krishna': 'कृष्ण', 'rama': 'राम', 'sita': 'सीता', 'hanuman': 'हनुमान',
    'ganesha': 'गणेश', 'shiva': 'शिव', 'vishnu': 'विष्णु', 'durga': 'दुर्गा'
};

// Character mapping for transliteration
const charMap = {
    // Vowels (standalone)
    'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
    
    // Consonants with inherent 'a'
    'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'nga': 'ङ',
    'cha': 'च', 'chha': 'छ', 'ja': 'ज', 'jha': 'झ', 'nya': 'ञ',
    'ta': 'त', 'tha': 'थ', 'da': 'द', 'dha': 'ध', 'na': 'न',
    'pa': 'प', 'pha': 'फ', 'ba': 'ब', 'bha': 'भ', 'ma': 'म',
    'ya': 'य', 'ra': 'र', 'la': 'ल', 'va': 'व', 'wa': 'व',
    'sha': 'श', 'sa': 'स', 'ha': 'ह',
    
    // Special combinations
    'ksha': 'क्ष', 'tra': 'त्र', 'gya': 'ज्ञ',
    
    // Single consonants (with halant)
    'k': 'क्', 'kh': 'ख्', 'g': 'ग्', 'gh': 'घ्',
    'ch': 'च्', 'j': 'ज्', 'jh': 'झ्',
    't': 'त्', 'th': 'थ्', 'd': 'द्', 'dh': 'ध्', 'n': 'न्',
    'p': 'प्', 'ph': 'फ्', 'b': 'ब्', 'bh': 'भ्', 'm': 'म्',
    'y': 'य्', 'r': 'र्', 'l': 'ल्', 'v': 'व्', 'w': 'व्',
    'sh': 'श्', 's': 'स्', 'h': 'ह्',
    
    // Numbers
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    
    // Special
    'om': 'ॐ', 'aum': 'ॐ'
};

// Vowel matras (to be added after consonants)
const matras = {
    'aa': 'ा', 'i': 'ि', 'ii': 'ी', 'u': 'ु', 'uu': 'ू',
    'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ'
};

// DOM Elements
const englishInput = document.getElementById('englishInput');
const hindiOutput = document.getElementById('hindiOutput');
const clearInputBtn = document.getElementById('clearInput');
const clearOutputBtn = document.getElementById('clearOutput');
const copyOutputBtn = document.getElementById('copyOutput');
const inputCount = document.getElementById('inputCount');
const outputCount = document.getElementById('outputCount');
const suggestionsContainer = document.getElementById('suggestionsContainer');
const suggestionsList = document.getElementById('suggestionsList');
const exampleItems = document.querySelectorAll('.example-item');

// Main transliteration function
function transliterate(text) {
    if (!text) return '';
    
    // Split into words, preserving spaces
    const words = text.split(/(\s+)/);
    
    return words.map(word => {
        if (/^\s+$/.test(word)) {
            return word; // Keep whitespace as is
        }
        return transliterateWord(word.toLowerCase());
    }).join('');
}

function transliterateWord(word) {
    // Check for exact word match first
    if (wordDatabase[word]) {
        return wordDatabase[word];
    }
    
    // Character-by-character transliteration
    let result = '';
    let i = 0;
    
    while (i < word.length) {
        let matched = false;
        
        // Try longer patterns first (4, 3, 2, 1 characters)
        for (let len = 4; len >= 1; len--) {
            if (i + len <= word.length) {
                const substr = word.substr(i, len);
                
                if (charMap[substr]) {
                    result += charMap[substr];
                    i += len;
                    matched = true;
                    break;
                }
            }
        }
        
        // If no match, keep original character
        if (!matched) {
            result += word[i];
            i++;
        }
    }
    
    return result;
}

// Word suggestion functions
function getSuggestions(input) {
    if (!input || input.length < 2) return [];
    
    const searchTerm = input.toLowerCase();
    const suggestions = [];
    
    Object.keys(wordDatabase).forEach(word => {
        if (word.startsWith(searchTerm) || word.includes(searchTerm)) {
            suggestions.push({
                english: word,
                hindi: wordDatabase[word]
            });
        }
    });
    
    // Sort: exact prefix matches first, then by length
    suggestions.sort((a, b) => {
        const aStarts = a.english.startsWith(searchTerm);
        const bStarts = b.english.startsWith(searchTerm);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return a.english.length - b.english.length;
    });
    
    return suggestions.slice(0, 6); // Limit to 6 suggestions
}

function showSuggestions(suggestions) {
    if (!suggestions || suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsList.innerHTML = suggestions.map(s => `
        <div class="suggestion-item" data-english="${s.english}">
            <span class="suggestion-english">${s.english}</span>
            <span class="suggestion-arrow">→</span>
            <span class="suggestion-hindi">${s.hindi}</span>
        </div>
    `).join('');
    
    suggestionsContainer.classList.add('show');
    
    // Add click handlers
    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const word = item.dataset.english;
            insertSuggestion(word);
        });
    });
}

function hideSuggestions() {
    suggestionsContainer.classList.remove('show');
}

function insertSuggestion(word) {
    const cursorPos = englishInput.selectionStart;
    const text = englishInput.value;
    
    // Find current word boundaries
    let start = cursorPos;
    let end = cursorPos;
    
    // Find start of current word
    while (start > 0 && /[a-zA-Z]/.test(text[start - 1])) {
        start--;
    }
    
    // Find end of current word
    while (end < text.length && /[a-zA-Z]/.test(text[end])) {
        end++;
    }
    
    // Replace current word with suggestion
    const newText = text.substring(0, start) + word + text.substring(end);
    englishInput.value = newText;
    
    // Position cursor after inserted word
    const newPos = start + word.length;
    englishInput.setSelectionRange(newPos, newPos);
    
    // Trigger transliteration
    englishInput.dispatchEvent(new Event('input'));
    hideSuggestions();
}

function getCurrentWord() {
    const cursorPos = englishInput.selectionStart;
    const text = englishInput.value;
    
    let start = cursorPos;
    let end = cursorPos;
    
    // Find word boundaries
    while (start > 0 && /[a-zA-Z]/.test(text[start - 1])) {
        start--;
    }
    
    while (end < text.length && /[a-zA-Z]/.test(text[end])) {
        end++;
    }
    
    return text.substring(start, end);
}

// Event Listeners
englishInput.addEventListener('input', function() {
    const inputText = this.value;
    const transliteratedText = transliterate(inputText);
    
    hindiOutput.value = transliteratedText;
    
    // Update character counts
    inputCount.textContent = inputText.length;
    outputCount.textContent = transliteratedText.length;
    
    // Show suggestions for current word
    const currentWord = getCurrentWord();
    if (currentWord && currentWord.length >= 2) {
        const suggestions = getSuggestions(currentWord);
        showSuggestions(suggestions);
    } else {
        hideSuggestions();
    }
});

// Clear buttons
clearInputBtn.addEventListener('click', function() {
    englishInput.value = '';
    hindiOutput.value = '';
    inputCount.textContent = '0';
    outputCount.textContent = '0';
    hideSuggestions();
    englishInput.focus();
});

clearOutputBtn.addEventListener('click', function() {
    hindiOutput.value = '';
    outputCount.textContent = '0';
});

// Copy functionality
copyOutputBtn.addEventListener('click', async function() {
    const text = hindiOutput.value;
    if (!text) return;
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Visual feedback
        this.classList.add('copy-success');
        this.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            this.classList.remove('copy-success');
            this.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1000);
        
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Visual feedback
        this.classList.add('copy-success');
        this.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            this.classList.remove('copy-success');
            this.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1000);
    }
});

// Example word clicks
exampleItems.forEach(item => {
    item.addEventListener('click', function() {
        const english = this.dataset.english;
        const hindi = this.dataset.hindi;
        
        englishInput.value = english;
        hindiOutput.value = hindi;
        
        inputCount.textContent = english.length;
        outputCount.textContent = hindi.length;
        
        englishInput.focus();
        englishInput.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!suggestionsContainer.contains(e.target) && e.target !== englishInput) {
        hideSuggestions();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearInputBtn.click();
    }
    
    if (e.key === 'Escape') {
        hideSuggestions();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    inputCount.textContent = '0';
    outputCount.textContent = '0';
    englishInput.focus();
});

