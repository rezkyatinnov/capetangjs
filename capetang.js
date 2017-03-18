/**
 * CapetangJS
 * 
 * A javascript engine for Text to speech using WebSpeech API by rezkyatinnov
 */
(function() {
    var root = this;
    if ('speechSynthesis' in root) {
        console.log('Yeay!! Your browser supports speech synthesis.');
    } else {
        console.log('Oops! Sorry, It seems your browser doesn\'t support speech synthesis.');
    }

    var voiceList = speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function(e) {
        voiceList = speechSynthesis.getVoices();
    };

    function Capetang() {
        // Current version.
        var self = this;
        this.VERSION = '0.1.1';

        var _DEFAULT_LANG = "en-US";
        var _DEFAULT_VOLUME = 1;
        var _DEFAULT_RATE = 1;
        var _DEFAULT_PITCH = 1;
        var _DEFAULT_CALLBACK = function(event) {};

        var _text = "";
        var _lang = _DEFAULT_LANG;
        var _volume = _DEFAULT_VOLUME;
        var _rate = _DEFAULT_RATE;
        var _pitch = _DEFAULT_PITCH;
        var _lastError = "";
        var _onError = _DEFAULT_CALLBACK;
        var _onStart = _DEFAULT_CALLBACK;
        var _onEnd = _DEFAULT_CALLBACK;
        var _onPaused = _DEFAULT_CALLBACK;
        var _onResume = _DEFAULT_CALLBACK;
        var _onBoundary = _DEFAULT_CALLBACK;
        var _onMark = _DEFAULT_CALLBACK;

        this.getText = function() { return _text; };
        this.setText = function(text) { _text = text; return this; };

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

        this.onError = function() { return _onError; };
        this.setOnError = function(onErrorFunc) { _onError = onErrorFunc; return this; };
        this.onStart = function() { return _onStart; };
        this.setOnStart = function(onStartFunc) { _onStart = onStartFunc; return this; };
        this.onEnd = function() { return _onEnd; };
        this.setOnEnd = function(onEndFunc) { _onEnd = onEndFunc; return this; };
        this.onPaused = function() { return _onPaused; };
        this.setOnPaused = function(onPausedFunc) { _onPaused = onPausedFunc; return this; };
        this.onResume = function() { return _onResume; };
        this.setOnResume = function(onResumeFunc) { _onResume = onResumeFunc; return this; };
        this.onBoundary = function() { return _onBoundary; };
        this.setOnBoundary = function(onBoundaryFunc) { _onBoundary = onBoundaryFunc; return this; };
        this.onMark = function() { return _onMark; };
        this.setOnMark = function(onMarkFunc) { _onMark = onMarkFunc; return this; };

        this.initVoice = function() {
            _text = "";
            _lang = _DEFAULT_LANG;
            _pitch = _DEFAULT_PITCH;
            _rate = _DEFAULT_RATE;
            _volume = _DEFAULT_VOLUME;
            _onError = _DEFAULT_CALLBACK;
            _onStart = _DEFAULT_CALLBACK;
            _onEnd = _DEFAULT_CALLBACK;
            _onPaused = _DEFAULT_CALLBACK;
            _onResume = _DEFAULT_CALLBACK;
            _onBoundary = _DEFAULT_CALLBACK;
            _onMark = _DEFAULT_CALLBACK;
        };

        this.resetDefault = function() {
            _DEFAULT_LANG = 'en-US';
            _DEFAULT_PITCH = 1;
            _DEFAULT_RATE = 1;
            _DEFAULT_VOLUME = 1;
            _DEFAULT_CALLBACK = function(event) {};
            self.initVoice();
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

        if (text == null || text == undefined) {
            msg.text = self.getText();
        } else {
            msg.text = text;
        }
        msg.lang = self.getLang();

        msg.volume = parseFloat(self.getVolume());
        msg.rate = parseFloat(self.getRate());
        msg.pitch = parseFloat(self.getPitch());

        msg.onerror = self.onError();
        msg.onstart = self.onStart();
        msg.onend = self.onEnd();
        msg.onboundary = self.onBoundary();
        msg.onmark = self.onMark();
        msg.onpause = self.onPaused();
        msg.onresume = self.onResume();

        // TODO: makes sure all of this execute after window.speechSynthesis.onvoiceschanged fired
        var voice = speechSynthesis.getVoices().filter(function(voice) {
            return voice.lang == self.getLang();
        });
        if (voice != null && voice.length > 0) {
            msg.voice = voice[0];
        }

        window.speechSynthesis.speak(msg);
        self.initVoice();
    };

    Capetang.prototype.fetchVoices = function() {
        return speechSynthesis.getVoices();
    }

    root.capetang = new Capetang();
}).call(this);