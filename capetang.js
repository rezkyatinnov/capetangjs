/**
 * A javascript engine for Text to speech using WebSpeech API by rezkyatinnov
 */

if ('speechSynthesis' in window) {
    console.log('Yeay!! Your browser supports speech synthesis.');
} else {
    console.log('Oops! Sorry, It seems your browser doesn\'t support speech synthesis.');
}

var voiceList = speechSynthesis.getVoices();
window.speechSynthesis.onvoiceschanged = function(e) {
    voiceList = speechSynthesis.getVoices();
};

// Create a safe reference to the Capetang object for use below.
function Capetang(obj) {
    if (obj instanceof Capetang) return obj;
    if (!(this instanceof Capetang)) return new Capetang(obj);
    this._wrapped = obj;
};

// Current version.
Capetang.prototype.VERSION = '0.0.1';

Capetang.prototype.text = "";
Capetang.prototype.lang = "en-US";
Capetang.prototype.volume = 1;
Capetang.prototype.rate = 1;
Capetang.prototype.pitch = 1;
Capetang.prototype.lastError = ""
Capetang.prototype.speak = function(text) {
    var self = this;
    var msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.lang = self.lang;

    msg.volume = parseFloat(self.volume);
    msg.rate = parseFloat(self.rate);
    msg.pitch = parseFloat(self.pitch);
    var voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.default == true;
    });
    if (voice != null && voice.length > 0) {
        msg.voice = voice[0];
    }

    msg.onerror = function(event) {
        self.lastError = event.error;
    }

    window.speechSynthesis.speak(msg);
};

Capetang.prototype.fetchVoices = function() {
    return speechSynthesis.getVoices();
}

// Run Capetang.js in *noConflict* mode, returning the `capetang` variable to its
// previous owner. Returns a reference to the Capetang object.
Capetang.prototype.noConflict = function() {
    root.capetang = prevCapetang;
    return this;
};

var capetang = new Capetang(this);