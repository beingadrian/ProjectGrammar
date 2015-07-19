
var isRecording = false;

$(document).ready(function() {

    // hide results page
    $('.results-page').hide()

    var oval_element = $('#oval')

    // recording function
    oval_element.click(function (event) {

        var status_message = $('#status-message')

        if(!isRecording) {
            // if not recording, isRecording is true
            isRecording = true;
            startRecording();
            status_message.fadeOut(400);
            // change color
            oval_element.css("-webkit-filter", "hue-rotate(90deg)")
            // animate isRecording

        } else {
            // if recording, stop recording
            isRecording = false;
            stopRecording();
            status_message.fadeIn(400);

            // analyzing
            status_message.text("Analyzing...");
            $('#mic').attr("src", "assets/images/loading-gear.svg");
            oval_element.css("-webkit-filter", "hue-rotate(0deg)");

            // present results page
            $('#recording-wrapper').animate({opacity: 0}, 1000, function() {
                // this.hide();
            })
            $('.results-page').show(1500);
        }

        // analyze data

    });

    // bottom arrow
    $('#down-arrow').click(function() {
        scrollToAnchor("analytics-section")
    });

    // retry button
    $('#retry-button').click(function() {
        $('.results-page').hide(1000);
        $('#recording-wrapper').animate({opacity: 1}, 1000, function() {
        // this.hide();
        });
        $('#status-message').text("Click to start recording");
        isRecording = false;
    });

    // set height
    var document_height = $(document).height();
    $('.results-section').css('height', document_height);

    // scroll mechanism
    function scrollToAnchor(aid){
        var aTag = $("a[name='"+ aid +"']");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    };

});

// perform analysis
