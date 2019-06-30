export function createSpeechRecognition(socket) {
  var recognizing = false;
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
      var results = event.results
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
        socket.emit('term_data', transcripts[0]);
         for (alt_index = 0; alt_index < recognition.maxAlternatives; ++alt_index) {
          console.log('recog[' + alt_index + '] = ' + transcripts[alt_index]);
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
