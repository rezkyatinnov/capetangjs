/**
 * A javascript engine for Text to speech using WebSpeech API by rezkyatinnov
 */

if ('speechSynthesis' in window) {
    console.log('Your browser supports speech synthesis.');
} else {
    console.log('Sorry your browser does not support speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
}

var voice = speechSynthesis.getVoices();
console.log('all voices', voice);
voice = speechSynthesis.getVoices().filter(function(voice) { return voice.lang == 'id-ID'; });
console.log('voice indo list', voice);
voice = speechSynthesis.getVoices().filter(function(voice) { return voice.localService == true; });
console.log('voice offline list', voice);
window.speechSynthesis.onvoiceschanged = function(e) {
    console.log('onvoiceschanged', speechSynthesis.getVoices());
    voice = speechSynthesis.getVoices().filter(function(voice) { return voice.lang == 'id-ID'; });
    console.log('onvoiceschanged voice indo list', voice);
    voice = speechSynthesis.getVoices().filter(function(voice) { return voice.localService == true; });
    console.log('onvoiceschanged voice offline list', voice);
};



var capetang = {
    speak: function(text) {
        var volumeInput = 1; // max 1
        var rateInput = 1; // max 10
        var pitchInput = 1; // max 2

        var msg = new SpeechSynthesisUtterance();

        msg.text = text;
        msg.lang = "id-ID";

        msg.volume = parseFloat(volumeInput);
        msg.rate = parseFloat(rateInput);
        msg.pitch = parseFloat(pitchInput);
        voice = speechSynthesis.getVoices().filter(function(voice) { return voice.lang == 'id-ID'; });
        console.log('voice indo list', voice);
        if (voice != null && voice.length > 0) {
            msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.lang == 'id-ID'; })[0];
        }
        msg.onerror = function(event) {
            console.log('An error has occurred with the speech synthesis: ' + event.error);
        }

        window.speechSynthesis.speak(msg);
    }
}