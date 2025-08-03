// Improved English to Hindi Transliteration Mapping
const consonantMap = {
    // Retroflex consonants
    'T': 'ट', 'Th': 'ठ', 'D': 'ड', 'Dh': 'ढ', 'N': 'ण',
    // Dental consonants  
    't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
    // Other consonants
    'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
    'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
    'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
    'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
    'sh': 'श', 'Sh': 'ष', 's': 'स', 'h': 'ह',
    // Compound consonants
    'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ', 'shr': 'श्र'
};

const vowelMap = {
    'a': 'अ', 'aa': 'आ', 'A': 'आ',
    'i': 'इ', 'ii': 'ई', 'I': 'ई', 
    'u': 'उ', 'uu': 'ऊ', 'U': 'ऊ',
    'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
    'ri': 'ऋ', 'R': 'ऋ'
};

const vowelMatras = {
    'aa': 'ा', 'A': 'ा',
    'i': 'ि', 'ii': 'ी', 'I': 'ी',
    'u': 'ु', 'uu': 'ू', 'U': 'ू',
    'e': 'े', 'ai': 'ै', 'o': 'ो', 'au': 'ौ',
    'ri': 'ृ', 'R': 'ृ'
};

const specialChars = {
    'om': 'ॐ', 'aum': 'ॐ', 'OM': 'ॐ', 'AUM': 'ॐ',
    '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
    '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
    '.': '।', '|': '।', '||': '॥'
};

// Comprehensive word database for suggestions and accurate transliteration
const wordDatabase = {
    // Common greetings and expressions
    'namaste': 'नमस्ते', 'namaskar': 'नमस्कार', 'pranam': 'प्रणाम',
    'dhanyawad': 'धन्यवाद', 'shukriya': 'शुक्रिया', 'kshama': 'क्षमा',
    'maaf': 'माफ', 'alvida': 'अलविदा',
    
    // Spiritual and philosophical terms
    'yoga': 'योग', 'guru': 'गुरु', 'mantra': 'मंत्र', 'dharma': 'धर्म',
    'karma': 'कर्म', 'moksha': 'मोक्ष', 'ahimsa': 'अहिंसा', 'satya': 'सत्य',
    'prema': 'प्रेम', 'shanti': 'शांति', 'bhakti': 'भक्ति', 'seva': 'सेवा',
    'tapas': 'तपस', 'satsang': 'सत्संग', 'sadhana': 'साधना',
    'pranayama': 'प्राणायाम', 'asana': 'आसन', 'meditation': 'ध्यान',
    'dhyan': 'ध्यान', 'samadhi': 'समाधि', 'nirvana': 'निर्वाण',
    
    // Languages and scripts
    'sanskrit': 'संस्कृत', 'hindi': 'हिंदी', 'devanagari': 'देवनागरी',
    'urdu': 'उर्दू', 'bengali': 'बंगाली', 'tamil': 'तमिल',
    'telugu': 'तेलुगु', 'marathi': 'मराठी', 'gujarati': 'गुजराती',
    'punjabi': 'पंजाबी', 'kannada': 'कन्नड़', 'malayalam': 'मलयालम',
    
    // Countries and places
    'bharat': 'भारत', 'india': 'भारत', 'hindustan': 'हिंदुस्तान',
    'pakistan': 'पाकिस्तान', 'bangladesh': 'बांग्लादेश', 'nepal': 'नेपाल',
    'srilanka': 'श्रीलंका', 'tibet': 'तिब्बत', 'china': 'चीन',
    'america': 'अमेरिका', 'england': 'इंग्लैंड', 'japan': 'जापान',
    
    // Major Indian cities
    'delhi': 'दिल्ली', 'mumbai': 'मुंबई', 'kolkata': 'कोलकाता',
    'chennai': 'चेन्नई', 'bangalore': 'बैंगलोर', 'hyderabad': 'हैदराबाद',
    'pune': 'पुणे', 'ahmedabad': 'अहमदाबाद', 'surat': 'सूरत',
    'jaipur': 'जयपुर', 'lucknow': 'लखनऊ', 'kanpur': 'कानपुर',
    'nagpur': 'नागपुर', 'indore': 'इंदौर', 'bhopal': 'भोपाल',
    'varanasi': 'वाराणसी', 'agra': 'आगरा', 'amritsar': 'अमृतसर',
    'chandigarh': 'चंडीगढ़', 'goa': 'गोवा', 'shimla': 'शिमला',
    
    // Family relations
    'mata': 'माता', 'pita': 'पिता', 'maa': 'माँ', 'papa': 'पापा',
    'bhai': 'भाई', 'behan': 'बहन', 'dada': 'दादा', 'dadi': 'दादी',
    'nana': 'नाना', 'nani': 'नानी', 'chacha': 'चाचा', 'chachi': 'चाची',
    'mama': 'मामा', 'mami': 'मामी', 'tau': 'ताऊ', 'tai': 'ताई',
    'beta': 'बेटा', 'beti': 'बेटी', 'pati': 'पति', 'patni': 'पत्नी',
    
    // Common words
    'ghar': 'घर', 'paani': 'पानी', 'khana': 'खाना', 'kaam': 'काम',
    'samay': 'समय', 'din': 'दिन', 'raat': 'रात', 'subah': 'सुबह',
    'shaam': 'शाम', 'saal': 'साल', 'mahina': 'महीना', 'hafta': 'हफ्ता',
    'aaj': 'आज', 'kal': 'कल', 'parso': 'परसों', 'abhi': 'अभी',
    'yaha': 'यहाँ', 'waha': 'वहाँ', 'kaha': 'कहाँ', 'kya': 'क्या',
    'kaun': 'कौन', 'kab': 'कब', 'kaise': 'कैसे', 'kyun': 'क्यों',
    
    // Colors
    'safed': 'सफेद', 'kala': 'काला', 'lal': 'लाल', 'neela': 'नीला',
    'hara': 'हरा', 'peela': 'पीला', 'gulabi': 'गुलाबी', 'baingani': 'बैंगनी',
    'narangi': 'नारंगी', 'bhura': 'भूरा',
    
    // Numbers
    'ek': 'एक', 'do': 'दो', 'teen': 'तीन', 'char': 'चार', 'panch': 'पांच',
    'chhe': 'छह', 'saat': 'सात', 'aath': 'आठ', 'nau': 'नौ', 'das': 'दस',
    'gyarah': 'ग्यारह', 'barah': 'बारह', 'terah': 'तेरह', 'chaudah': 'चौदह',
    'pandrah': 'पंद्रह', 'solah': 'सोलह', 'satrah': 'सत्रह', 'athaarah': 'अठारह',
    'unnis': 'उन्नीस', 'bees': 'बीस', 'sau': 'सौ', 'hazar': 'हज़ार',
    
    // Historical figures
    'gandhi': 'गांधी', 'nehru': 'नेहरू', 'subhash': 'सुभाष', 'bhagat': 'भगत',
    'chandrashekhar': 'चंद्रशेखर', 'rani': 'रानी', 'lakshmibai': 'लक्ष्मीबाई',
    'shivaji': 'शिवाजी', 'akbar': 'अकबर', 'ashoka': 'अशोक',
    
    // Festivals
    'diwali': 'दिवाली', 'holi': 'होली', 'dussehra': 'दशहरा', 'navratri': 'नवरात्रि',
    'karwachauth': 'करवाचौथ', 'rakhi': 'राखी', 'janmashtami': 'जन्माष्टमी',
    'ganpati': 'गणपति', 'durga': 'दुर्गा', 'kali': 'काली', 'lakshmi': 'लक्ष्मी',
    'saraswati': 'सरस्वती', 'hanuman': 'हनुमान', 'krishna': 'कृष्ण',
    'rama': 'राम', 'sita': 'सीता', 'shiva': 'शिव', 'vishnu': 'विष्णु',
    'brahma': 'ब्रह्मा', 'ganesha': 'गणेश'
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
const suggestionsContainer = document.getElementById('suggestionsContainer');
const suggestionsList = document.getElementById('suggestionsList');

// Improved transliteration function
function transliterate(text) {
    if (!text) return '';
    
    // Split text into words while preserving spaces and punctuation
    const tokens = text.split(/(\s+)/);
    
    return tokens.map(token => {
        if (/^\s+$/.test(token)) {
            return token; // Preserve whitespace
        }
        return transliterateWord(token);
    }).join('');
}

function transliterateWord(word) {
    if (!word) return '';
    
    // Check for exact word match first (case insensitive)
    const lowerWord = word.toLowerCase();
    const cleanWord = lowerWord.replace(/[^\w]/g, '');
    
    if (wordDatabase[cleanWord]) {
        return word.replace(new RegExp(cleanWord, 'gi'), wordDatabase[cleanWord]);
    }
    
    // Check special characters
    if (specialChars[cleanWord]) {
        return specialChars[cleanWord];
    }
    
    // Perform character-by-character transliteration
    return transliterateByCharacters(word);
}

function transliterateByCharacters(word) {
    let result = '';
    let i = 0;
    
    while (i < word.length) {
        let matched = false;
        let char = word[i];
        
        // Skip non-alphabetic characters
        if (!/[a-zA-Z]/.test(char)) {
            result += specialChars[char] || char;
            i++;
            continue;
        }
        
        // Try to match compound consonants first (longest patterns)
        for (let len = 4; len >= 1; len--) {
            if (i + len <= word.length) {
                const substr = word.substr(i, len).toLowerCase();
                
                // Check compound consonants
                if (consonantMap[substr]) {
                    const nextChar = i + len < word.length ? word[i + len].toLowerCase() : '';
                    
                    // If next character is a vowel, add consonant + vowel matra
                    if (vowelMatras[nextChar]) {
                        result += consonantMap[substr] + vowelMatras[nextChar];
                        i += len + 1;
                        matched = true;
                        break;
                    } 
                    // If next character is 'a' or no character, add consonant with inherent 'a'
                    else if (nextChar === 'a' || nextChar === '' || consonantMap[nextChar]) {
                        result += consonantMap[substr];
                        i += len;
                        if (nextChar === 'a') i++; // Skip explicit 'a'
                        matched = true;
                        break;
                    }
                    // Otherwise add consonant with halant (्)
                    else {
                        result += consonantMap[substr] + '्';
                        i += len;
                        matched = true;
                        break;
                    }
                }
                
                // Check standalone vowels
                if (vowelMap[substr]) {
                    result += vowelMap[substr];
                    i += len;
                    matched = true;
                    break;
                }
            }
        }
        
        // If no match found, keep the original character
        if (!matched) {
            result += char;
            i++;
        }
    }
    
    return result;
}

// Word suggestion functionality
function getSuggestions(input) {
    if (!input || input.length < 2) return [];
    
    const searchTerm = input.toLowerCase().trim();
    const suggestions = [];
    
    // Find matching words
    Object.keys(wordDatabase).forEach(word => {
        if (word.toLowerCase().includes(searchTerm) && word !== searchTerm) {
            suggestions.push({
                english: word,
                hindi: wordDatabase[word]
            });
        }
    });
    
    // Sort by relevance (exact matches first, then by length)
    suggestions.sort((a, b) => {
        const aStarts = a.english.toLowerCase().startsWith(searchTerm);
        const bStarts = b.english.toLowerCase().startsWith(searchTerm);
        
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        
        return a.english.length - b.english.length;
    });
    
    return suggestions.slice(0, 8); // Limit to 8 suggestions
}

function showSuggestions(suggestions) {
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsList.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-english="${suggestion.english}" data-hindi="${suggestion.hindi}">
            <span class="suggestion-english">${suggestion.english}</span>
            <span class="suggestion-arrow">→</span>
            <span class="suggestion-hindi">${suggestion.hindi}</span>
        </div>
    `).join('');
    
    suggestionsContainer.classList.add('show');
    
    // Add click handlers to suggestions
    suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const english = this.dataset.english;
            const hindi = this.dataset.hindi;
            
            // Get current cursor position
            const cursorPos = englishInput.selectionStart;
            const currentText = englishInput.value;
            
            // Find the current word being typed
            const beforeCursor = currentText.substring(0, cursorPos);
            const afterCursor = currentText.substring(cursorPos);
            
            // Find word boundaries
            const wordStart = Math.max(
                beforeCursor.lastIndexOf(' '),
                beforeCursor.lastIndexOf('\n'),
                beforeCursor.lastIndexOf('\t')
            ) + 1;
            
            const wordEnd = Math.min(
                afterCursor.search(/[\s\n\t]/),
                afterCursor.length
            );
            
            const actualWordEnd = wordEnd === -1 ? afterCursor.length : wordEnd;
            
            // Replace the current word with the selected suggestion
            const newText = beforeCursor.substring(0, wordStart) + 
                          english + 
                          afterCursor.substring(actualWordEnd);
            
            englishInput.value = newText;
            englishInput.focus();
            
            // Position cursor after the inserted word
            const newCursorPos = wordStart + english.length;
            englishInput.setSelectionRange(newCursorPos, newCursorPos);
            
            // Trigger transliteration
            englishInput.dispatchEvent(new Event('input'));
            
            hideSuggestions();
        });
    });
}

function hideSuggestions() {
    suggestionsContainer.classList.remove('show');
}

function getCurrentWord() {
    const cursorPos = englishInput.selectionStart;
    const text = englishInput.value;
    
    // Find word boundaries around cursor
    let start = cursorPos;
    let end = cursorPos;
    
    // Find start of word
    while (start > 0 && /[a-zA-Z]/.test(text[start - 1])) {
        start--;
    }
    
    // Find end of word
    while (end < text.length && /[a-zA-Z]/.test(text[end])) {
        end++;
    }
    
    return text.substring(start, end);
}

// Real-time transliteration with suggestions
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

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!suggestionsContainer.contains(e.target) && e.target !== englishInput) {
        hideSuggestions();
    }
});

// Hide suggestions on escape key
englishInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideSuggestions();
    }
});

// Clear input
clearInputBtn.addEventListener('click', function() {
    englishInput.value = '';
    hindiOutput.value = '';
    inputCount.textContent = '0';
    outputCount.textContent = '0';
    hideSuggestions();
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

