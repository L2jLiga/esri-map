# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.0]
### Added
- Option to specify ArcGIS JS API version.

### Changed
- Update default JS API version to 4.15 (was 4.11)
- Update to Angular 10

## [4.0.0]
### Changed
- Changed `mapInstance$` type of `NgEsriMapComponent` from `ReplaySubject` to `BehaviorSubject`

## [3.0.3]
### Fixed
- Destroy map correctly

## [3.0.2]
### Changed
- Updated to latest Angular & Angular CLI
- Updated to latest ng-packagr
- Updated to TypeScript 3.5

### Fixed
- Library didn't work when built with Ivy
- Corrected map destroy mechanism

## [3.0.1]
### Fixed
- inability to use library when Ivy enabled

## [3.0.0]
### Added
- `createPoint` public method

### Changed
- `addGraphic` and `removeGraphic` now public
- Allow to define GoToOverride in home button options
- updated methods description

### Removed
- ng-esri-map component
- Support for Angular <8

## [2.2.5]
### Changed
- Updated typings for argis js api to 4.11 to match current ArcGIS version
- Added Angular 8 to peer dependencies

## [2.2.4]
### Changed
- Updated ArcGIS API to 4.11

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

[Unreleased]: https://github.com/L2jLiga/esri-map/compare/v5.0.0...HEAD
[5.0.0]: https://github.com/L2jLiga/esri-map/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/L2jLiga/esri-map/compare/v3.0.2...v4.0.0
[3.0.2]: https://github.com/L2jLiga/esri-map/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/L2jLiga/esri-map/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/L2jLiga/esri-map/compare/v2.2.5...v3.0.0
[2.2.5]: https://github.com/L2jLiga/esri-map/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/L2jLiga/esri-map/compare/v2.2.3...v2.2.4
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
