import './index.css';
import 'xterm/dist/xterm.css'
import {Terminal} from 'xterm';

$(function () {
var term = new Terminal({cursorBlink: true, rows: 40});
term.open(document.getElementById('terminal'));
var recognizing = false;

$('#g-signin').on('data-onsuccess', function(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
});
  
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
  recognition.onresult = function(event) {
    var results = event.results
    if (typeof(results) === 'undefined') { //Something is wrong…
        recognition.stop();
        return;
    }
     var transcript = '';
     var isFinal = true;
     for (var i = event.resultIndex; i < event.results.length; ++i) {
       var result = results[i];
       if (!result.isFinal) {
         isFinal = false;
       }
       var result_transcript = result[0].transcript;
       transcript += result_transcript;
     }
     if (isFinal) {
       term.write(transcript);
       interim_p.textContent = '';
     } else {
       interim_p.textContent = transcript;
     }
  };
}

$( "#speak" ).click(function() {
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
  
function runTerminal() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        term.write('\r\n$ ');
    };

    term.writeln('Welcome to xterm.js');
    term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
    term.writeln('Type some keys and commands to play around.');
    term.writeln('');
    term.prompt();
    // term.fit();

    term.on('key', function(key, ev) {
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.keyCode === 13) {
            term.prompt();
        } else if (ev.keyCode === 8) {
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
                term.write('\b \b');
            }
        } else if (printable) {
            term.write(key);
        }
    });

    term.on('paste', function(data) {
        term.write(data);
    });
}
runTerminal();
});
