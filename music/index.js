var audio = new Audio();
audio.src = 'luv-letter.mp3';

var audioContext = new AudioContext();

var audioContext = new AudioContext();
var analyser = audioContext.createAnalyser();
var audioSource = audioContext.createMediaElementSource(audio);

analyser.fftSize = 64;

var freqByteData = new Uint8Array(analyser.frequencyBinCount);

audioSource.connect(analyser);
analyser.connect(audioContext.destination);

var data = {};

audio.play();

var timer = setInterval(function () {
    if (audio.paused) return;
    analyser.getByteFrequencyData(freqByteData);
    var time = audio.currentTime.toFixed(1);
    data[time] = _.toArr(freqByteData);
    console.log(time);
}, 100);

var $download = _.$('#download');

$download.on('click', function (e) {
    e.preventDefault();
    download();
});

function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute('download', 'luv-letter.json');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}