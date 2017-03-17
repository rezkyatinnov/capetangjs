/**
 * CapetangJS
 * 
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
    // Current version.
    this.VERSION = '0.1.1';

    var _DEFAULT_LANG = "en-US";
    var _DEFAULT_VOLUME = 1;
    var _DEFAULT_RATE = 1;
    var _DEFAULT_PITCH = 1;

    var _text = "";
    var _lang = _DEFAULT_LANG;
    var _volume = _DEFAULT_VOLUME;
    var _rate = _DEFAULT_RATE;
    var _pitch = _DEFAULT_PITCH;
    var _lastError = "";
    this.getText = function() { return _text; };
    this.setText = function(text) { _text = text; };

    this.getLang = function() { return _lang; };
    this.setLang = function(lang) { _lang = lang; return this; };

    this.getVolume = function() { return _volume };
    this.setVolume = function(volume) { _volume = volume; return this; };

    this.getRate = function() { return _rate };
    this.setRate = function(rate) { _rate = rate; return this; };

    this.getPitch = function() { return _pitch };
    this.setPitch = function(pitch) { _pitch = pitch; return this; };

    this.getLastError = function() { return _lastError };
    this.setLastError = function(lastError) { _lastError = lastError };

    this.initVoice = function() {
        _lang = _DEFAULT_LANG;
        _pitch = _DEFAULT_PITCH;
        _rate = _DEFAULT_RATE;
        _volume = _DEFAULT_VOLUME;
    };

    this.resetDefault = function() {
        _DEFAULT_LANG = 'en-US';
        _DEFAULT_PITCH = 1;
        _DEFAULT_RATE = 1;
        _DEFAULT_VOLUME = 1;
    };

    this.setDefaultLang = function(lang) {
        _DEFAULT_LANG = lang;
        _lang = _DEFAULT_LANG;
    }
    this.setDefaultPitch = function(pitch) {
        _DEFAULT_PITCH = pitch;
        _pitch = pitch;
    }
    this.setDefaultRate = function(rate) {
        _DEFAULT_RATE = rate;
        _rate = rate;
    }
    this.setDefaultVolume = function(volume) {
        _DEFAULT_VOLUME = volume;
        _volume = volume;
    }
};

Capetang.prototype.speak = function(text) {
    var self = this;
    var msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.lang = self.getLang();

    msg.volume = parseFloat(self.getVolume());
    msg.rate = parseFloat(self.getRate());
    msg.pitch = parseFloat(self.getPitch());
    var voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.lang == self.getLang();
    });
    if (voice != null && voice.length > 0) {
        msg.voice = voice[0];
    }

    msg.onerror = function(event) {
        self.setLastError(event.error);
    }

    msg.onstart = function() {}

    msg.onend = function() {}

    window.speechSynthesis.speak(msg);
    self.initVoice();
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