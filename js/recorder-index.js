function __log(e, data) {
  console.log("\n" + e + " " + (data || ''));
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
  });

};

var audio_context;
var recorder;

function startUserMedia(stream) {
var input = audio_context.createMediaStreamSource(stream);
__log('Media stream created.');

// Uncomment if you want the audio to feedback directly
//input.connect(audio_context.destination);
//__log('Input connected to audio context destination.');

recorder = new Recorder(input);
__log('Recorder initialised.');
}

function startRecording() {
__log(recorder)
recorder && recorder.record();
__log('Recording...');
__log(recorder)
}

function stopRecording() {
recorder && recorder.stop();
__log('Stopped recording.');

// create WAV download link using audio data blob
recorder && recorder.exportWAV(function(blob) {
    var formData = new FormData();
    formData.append('FileData',blob, 'audio.wav');
    
    xhr = new XMLHttpRequest();
    xhr.open("POST","http://posttestserver.com/post.php?dir=steveo",true);
    xhr.send(formData);
    
    _app.audioSubmission(formData);
    
});
_app.audioSubmission(File);

recorder.clear();
}

/*function createDownloadLink() {
recorder && recorder.exportWAV(function(blob) {
  var url = URL.createObjectURL(blob);
  var li = document.createElement('li');
  var au = document.createElement('audio');
  var hf = document.createElement('a');

  au.controls = true;
  au.src = url;
  hf.href = url;
  hf.download = new Date().toISOString() + '.wav';
  hf.innerHTML = hf.download;
  li.appendChild(au);
  li.appendChild(hf);
  //recordingslist.appendChild(li);
   
});
}
*/
