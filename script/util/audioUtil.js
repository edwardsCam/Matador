var url = 'resources/audio/delicate_steve_tallest_heights.mp3',
    tempo = 105;

var sourceJs,
    audioContext,
    audioSource,
    audioAnalyser,
    beatTime = 60 / tempo,
    boost = 0,
    boostbuffer,
    fftSize = 512,
    smooth = 0.6,
    audioStarted = false;

(function() {
    try {
        audioContext = new AudioContext();
    } catch (e) {
        console.log('Web Audio API is not supported in this browser');
    }
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        audioContext.decodeAudioData(request.response, success, error);
    };
    request.onerror = function() {
        console.log('buffer: XHR error');
    };
    request.send();

    function success(buffer) {
        if (!buffer) {
            console.log('Error decoding file data');
            return;
        }

        sourceJs = audioContext.createScriptProcessor(2048, 1, 1);
        sourceJs.buffer = buffer;
        sourceJs.connect(audioContext.destination);
        audioAnalyser = audioContext.createAnalyser();
        audioAnalyser.smoothingTimeConstant = smooth;
        audioAnalyser.fftSize = fftSize;

        audioSource = audioContext.createBufferSource();
        audioSource.buffer = buffer;
        audioSource.loop = true;

        audioSource.connect(audioAnalyser);
        audioAnalyser.connect(sourceJs);
        audioSource.connect(audioContext.destination);

        sourceJs.onaudioprocess = audioProcess;
        play();

        function audioProcess(e) {
            soundBuckets = new Uint8Array(audioAnalyser.frequencyBinCount);
            audioAnalyser.getByteFrequencyData(soundBuckets);
            boost = 0;
            for (var i = 0; i < soundBuckets.length; i++) {
                boost += soundBuckets[i];
            }
            boost = boost / soundBuckets.length;
            if (boostbuffer == undefined) {
                boostbuffer = boost;
            }
            if (Math.abs(boostbuffer - boost) > 2) {
                boostbuffer = boost;
            }
        }
    }

    function error(msg) {
        console.log('Decoding error: ' + msg);
    }

    function play() {
        audioSource.start(0);
        audioStarted = true;
    }
})();
