
var isRecording = false;

$(document).ready(function() {

    $('#oval').click(function (event) {

        var status_message = $('#status-message')

        if(!isRecording) {
            // if not recording, isRecording is true
            isRecording = true;
            startRecording();
            status_message.fadeOut(400);
            // change color
            // event.target.css('',)
        } else {
            // if recording, stop recording
            isRecording = false;
            stopRecording();
            status_message.fadeIn(400);
            status_message.text("Analyzing...");
        }

        // analyze data

    });

});

// perform analysis
