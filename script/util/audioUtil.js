var url = 'resources/audio/tender_lost.mp3',
    tempo = 87;

var sourceJs,
    audioContext,
    audioSource,
    audioAnalyser,
    beatTime = 60 / tempo,
    avgBoost = 0,
    boostbuffer = 0,
    fftSize = 512,
    smooth = 0.6,
    audioStarted = false,
    beatCount = 0,
    beatSizes = [
        0.2, 0.6, 0.4, 0.6,
        0.2, 0.6, 0.4, 0.6,
        0.2, 0.6, 0.4, 0.6,
        0.2, 0.6, 0.4, 0.2,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0,   1,   0.8, 1,
        0
    ];

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
            /*
            soundBuckets = new Uint8Array(audioAnalyser.frequencyBinCount);
            audioAnalyser.getByteFrequencyData(soundBuckets);
            avgBoost = 0;
            for (var i = 0; i < soundBuckets.length; i++) {
                avgBoost += soundBuckets[i];
            }
            avgBoost /= soundBuckets.length;
            */
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
