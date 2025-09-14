# Changelog

All notable changes to the Sideline extension will be documented in this file.

## [0.0.1] - 2024-01-XX

### Fixed
- Premier League team logo display issues
  - Fixed Manchester United logo (MAN abbreviation)
  - Fixed Manchester City logo (MNC abbreviation) 
  - Added Burnley logo support (BUR abbreviation)
- VSIX packaging issue where webview.html wasn't included
- Team color mappings for Premier League teams
- Logo fallback now shows URL instead of team letter for debugging

### Added
- Debug logging for Premier League team URLs
- Better error handling for webview loading
- Multiple path checking for packaged extensions
- Comprehensive team abbreviation mappings

### Known Issues
- None currently known

### Technical Details
- Updated `.vscodeignore` to include `src/webview.html` and `src/SIDELINE.png`
- Enhanced `getWebviewContent()` method with fallback HTML
- Added debug logging throughout the extension
