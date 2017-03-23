# CapetangJS - CHANGELOG

## [0.2.2] - 2017-03-23
### Fixed
- missmatch bower version with gitcommit by version bumping

## [0.2.1] - 2017-03-23
### Added
- MIT LICENSE file
- jekyll config

### Changed
- update Readme. add link to demo project

### Fixed
- exception on set voice object validation

## [0.2.0] - 2017-03-19
### Added
- param validation when setVoice and setDefaultVoice
- list Voice when ready
- method to get speech status (speaking, paused, has pending)
- method to controll speech (pause, resume, cancel)
- set voice by name, by lang
- get voice list by filter name, lang

### Changed
- makes Capetang code enclosed. left only capetang object is accessible

## [0.1.0] - 2017-03-17
### Added
- set default language,volume,rate,pitch
- set on the fly language,volume,rate,pitch
- generate speech from text
- list all available voices