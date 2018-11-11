# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [2.1.2]
### Added
- Method to clear all layers on the map

### Changed
- Improved typing for scale bar unit type

### Fixed
- Map throws errors when was destroyed before fully-initialized

## [2.1.1]
### Added
- [Life example](https://l2jliga.github.io/esri-map)

### Fixed
- Component doesn't destroy correctly
- New layers overwrite existing when use different layers types

## [2.1.0]
### Added
- Configurable home button widget
- Configurable scale bar widget
- More configurable popup

### Changed
- mapView, main and secondary fields now are public
- Export all interfaces from package
- Removed `async` from createPopupAction method

### Fixed
- Remove of second point when putting new one

## [2.0.2]
### Added
- More APIs to display layers on map

## [2.0.1]
### Added
- descriptions to public APIs

### Removed
- e2e tests

## [2.0.0] - Initial release
Implemented APIs thought component

## [1.0.1]
### Changes
- Recreated with CLI 6.2.6

### Fixes
- Build in AoT

## [1.0.0] - Initial release

[Unreleased]: https://github.com/L2jLiga/esri-map/compare/v2.1.2...HEAD
[2.1.2]: https://github.com/L2jLiga/esri-map/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/L2jLiga/esri-map/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/L2jLiga/esri-map/compare/4fa4348...v2.1.0
[2.0.2]: https://github.com/L2jLiga/esri-map/compare/v2.0.1...4fa4348
[2.0.1]: https://github.com/L2jLiga/esri-map/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/L2jLiga/esri-map/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/L2jLiga/esri-map/compare/74a89d1...v1.0.1
[1.0.0]: https://github.com/L2jLiga/esri-map/compare/41b70cb...74a89d1
