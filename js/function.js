
// user click
    // start recording
var isRecording = false;

$(document).ready(function() {

    $('#oval').click(function (event) {
        if(!isRecording) {
            isRecording = true;
            startRecording();
        }
        if(isRecording) {
            isRecording = false;
            stopRecording();
        }
    }
    );

});

// user stop click
    // stop recording

// perform analysis
