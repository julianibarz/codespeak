export function createSpeechRecognition(socket) {
  var recognizing = false;
  var restricted_grammar = new RestrictedGrammar();
  function upgrade() {
    $(document.body).empty();
    var para = document.createElement('p');
    para.textContent = 'Your browser is incompatible, upgrade to latest version of Chrome!';
    document.body.appendChild(para);
    return;
  }
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
    return;
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.onresult = function(event) {
      var results = event.results;
      if (typeof(results) === 'undefined') { //Something is wrong…
        recognition.stop();
        return;
      }
      var transcripts = [];
      for (var alt_index = 0; alt_index < recognition.maxAlternatives; ++alt_index) {
        transcripts[alt_index] = '';
      } 
      var isFinal = true;
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        var result = results[i];
        if (!result.isFinal) {
          isFinal = false;
        }
        for (alt_index = 0; alt_index < result.length; ++alt_index) {
          var result_transcript = result[alt_index].transcript;
          transcripts[alt_index] += result_transcript;
        }
      }
      if (isFinal) {
        var data = restricted_grammar.applyGrammar(transcripts[0]);
        socket.emit('term_data', data);
         for (alt_index = 0; alt_index < recognition.maxAlternatives; ++alt_index) {
          console.log('recog[' + alt_index + '] = ' + JSON.stringify(transcripts[alt_index]));
        } 
        interim_p.textContent = '';
      } else {
        interim_p.textContent = transcripts[0];
      }
    };
  }

  $("#speak").click(function() {
    if (!recognizing) {
      recognizing = true;
      start_img.src = 'https://www.google.com/intl/en/chrome/assets/common/images/content/mic-animate.gif';
      recognition.start();
    } else {
      recognizing = false;
      start_img.src = 'https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif';
      recognition.stop();
    }
    return;
  });
}

function RestrictedGrammar() {
  this.keywords = {
    // Special characters.
    'back': "\b",
    'buck': "\b",
    'escape': "\x1B",
    'space': ' ',
    'tab': "\t",
    'table': "\t",
    'enter': "\n",
    '\n': "\n",
    // Punctuations.
    'coma': ',',
    'kuma': ',',
    'open': '',
    'close': '',
    'colon': ':',
    'collin': ':',
    'colin': ':',
    'semicolon': ';',
    'dot': '.',
    'quote': '\'',
    'quotes': '\'',
    'cool': '\'',
    'backslash': '\\',  
    'slash': '/',  
    'flash': '/',
    'equal': '=',
    'underscore': '_',
    'inferior': '<',
    'superior': '>',
    'plus': '+',
    'minus': '-',
    // Vim commands.
    'dollar': '$',
    'hat': '^', 
    'hot': '^', 
    // Alphabet.
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd',
    'e': 'e',
    'f': 'f',
    'g': 'g',
    'h': 'h',
    'i': 'i',  
    'j': 'j',  
    'k': 'k',  
    'l': 'l',  
    'm': 'm',  
    'n': 'n',  
    'o': 'o',  
    'p': 'p',  
    'q': 'q',  
    'r': 'r',  
    's': 's',  
    't': 't',  
    'u': 'u',  
    'v': 'v',  
    'w': 'w',  
    'x': 'x',  
    'y': 'y',  
    'z': 'z',  
    // NATO Alphabet.
    'alfa': 'a',
    'alpha': 'a',
    'bravo': 'b',
    'charlie': 'c',
    'delta': 'd',
    'echo': 'e',
    'foxtrot': 'f',
    'golf': 'g',
    'hotel': 'h',
    'india': 'i',
    'juliett': 'j',
    'juliet': 'j',  
    'kilo': 'k',
    'lima': 'l',
    'mike': 'm',
    'november': 'n',
    'oscar': 'o',
    'costco': 'o',
    'papa': 'p',
    'quebec': 'q',
    'romeo': 'r',
    'sierra': 's',
    'ciara': 's',
    'tango': 't',
    'uniform': 'u',
    'victor': 'v',
    'whiskey': 'w',
    'x-ray': 'x',
    'yankee': 'y',
    'zulu': 'z',
    // Numbers.
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'ten': '10',
    '.': '.',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9'
  };
  this.qualifiers = [
    'open',
    'close',
  ];
  this.qualifiers = {
    'parenthesis': ['(', ')'],
    'bracket': ['[', ']'],
    'braces': ['{', '}'],
  }
}

RestrictedGrammar.prototype.applyGrammar = function(text) {
  var out_text = '';
  console.log('before: ' + text);
  if (text == "\n") return text;
  var words = text.toLowerCase().split(' ');
  console.log('words: ' + words);
  for (var word_index = 0; word_index < words.length; ++word_index) { 
    var word = words[word_index];
    if (word in this.qualifiers) {
    }
    if (word in this.keywords) {
      out_text += this.keywords[word];
    }
  }
  console.log('after: ' + out_text);
  return out_text;
};
