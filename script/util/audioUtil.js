var audioContext,
    audioSource,
    audioAnalyser,
    url = 'resources/audio/maps.mp3',
    boost = 0,
    audioParams = {
        binCount: 256,
        fftSize: 256
    };

(function() {
    try {
        audioContext = new AudioContext();
    } catch (e) {
        console.log('Web Audio API is not supported in this browser');
    }
    console.log('getting resource...');
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        audioContext.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    console.log('Error decoding file data');
                    return;
                }

                console.log('Got resource!');
                var sourceJs = audioContext.createScriptProcessor(2048, 1, 1);
                sourceJs.buffer = buffer;
                sourceJs.connect(audioContext.destination);
                audioAnalyser = audioContext.createAnalyser();
                audioAnalyser.smoothingTimeConstant = 0.6;
                audioAnalyser.fftSize = audioParams.fftSize;

                audioSource = audioContext.createBufferSource();
                audioSource.buffer = buffer;
                audioSource.loop = true;

                audioSource.connect(audioAnalyser);
                audioAnalyser.connect(sourceJs);
                audioSource.connect(audioContext.destination);

                sourceJs.onaudioprocess = function(e) {
                    soundBuckets = new Uint8Array(audioAnalyser.frequencyBinCount);
                    audioAnalyser.getByteFrequencyData(soundBuckets);
                    boost = 0;
                    for (var i = 0; i < soundBuckets.length; i++) {
                        boost += soundBuckets[i];
                    }
                    boost = boost / soundBuckets.length;
                };

                audioSource.start(0);
            },
            function(error) {
                console.log('Decoding error: ' + error);
            }
        );
    };
    request.onerror = function() {
        console.log('buffer: XHR error');
    };

    request.send();
})();
