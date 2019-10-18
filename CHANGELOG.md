# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [3.0.4-4.9]
### Fixed
- Corrected map destroy mechanism

## [3.0.3-4.9]
### Fixed
- Corrected map destroy mechanism

## [3.0.2-4.9]
### Changed
- Updated to latest Angular & Angular CLI
- Updated to latest ng-packagr
- Updated to TypeScript 3.5

### Fixed
- Library didn't work when built with Ivy

## [3.0.1-4.9]
### Fixed
- inability to use library when Ivy enabled

## [3.0.0-4.9]
### Added
- `createPoint` public method

### Changed
- `addGraphic` and `removeGraphic` now public
- Allow to define GoToOverride in home button options
- updated methods description

### Removed
- ng-esri-map component
- Support for Angular <8

## [2.2.5-4.9]
### Changed
- Pinned typings for argis js api to 4.9 to match current ArcGIS version
- Added Angular 8 to peer dependencies

## [2.2.4-4.9]
### Fixed
- Rollback ArcGIS API to 4.9 to prevent broken map in Chrome w/o hardware acceleration

## [2.2.3]
### Added
- [MIT License](LICENSE)

# Changed
- Rebuild with latest CLI
- Adjusted peer dependencies to match Angular 8.x beta

## [2.2.2]
### Fixed
- Clean up layers list when new layers come

## [2.2.1]
### Changed
- Added extra checks for layers builders

## [2.2.0]
### Added
- Introduce directives way to build the map

### Changed
- Home widget now returns to main point if it exists
- Build target changed to ES9
- Added support for Angular 7
- Replace async/await with Promise.then in esri-services
- ngEsriMap component use directives to build itself

## [2.1.3]
### Changed
- Upgraded CLI to 6.2.8
- Initialize basemap gallery, layers list, scale bar and home button in parallel

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

[Unreleased]: https://github.com/L2jLiga/esri-map/compare/v3.0.3-4.9...HEAD
[3.0.3-4.9]: https://github.com/L2jLiga/esri-map/compare/v3.0.2-4.9...v3.0.3-4.9
[3.0.2-4.9]: https://github.com/L2jLiga/esri-map/compare/v3.0.1-4.9...v3.0.2-4.9
[3.0.1-4.9]: https://github.com/L2jLiga/esri-map/compare/v3.0.0-4.9...v3.0.1-4.9
[3.0.0-4.9]: https://github.com/L2jLiga/esri-map/compare/v2.2.5-4.9...v3.0.0-4.9
[2.2.5-4.9]: https://github.com/L2jLiga/esri-map/compare/v2.2.4-4.9...v2.2.5-4.9
[2.2.4-4.9]: https://github.com/L2jLiga/esri-map/compare/v2.2.3...v2.2.4-4.9
[2.2.3]: https://github.com/L2jLiga/esri-map/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/L2jLiga/esri-map/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/L2jLiga/esri-map/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/L2jLiga/esri-map/compare/v2.1.3...v2.2.0
[2.1.3]: https://github.com/L2jLiga/esri-map/compare/v2.1.2...v2.1.3
[2.1.2]: https://github.com/L2jLiga/esri-map/compare/v2.1.1...v2.1.2
[2.1.1]: https://github.com/L2jLiga/esri-map/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/L2jLiga/esri-map/compare/4fa4348...v2.1.0
[2.0.2]: https://github.com/L2jLiga/esri-map/compare/v2.0.1...4fa4348
[2.0.1]: https://github.com/L2jLiga/esri-map/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/L2jLiga/esri-map/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/L2jLiga/esri-map/compare/74a89d1...v1.0.1
[1.0.0]: https://github.com/L2jLiga/esri-map/compare/41b70cb...74a89d1
