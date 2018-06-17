# BlacKat Card Explorer

### Install

This is setup to be developed on using vagrant. Get that gubbinz installed and then run 'vagrant up'
in the root of the project. The DB will get imported each time and the server run, so you might find
you have to manually kill the server if you're making changes to that (pkill node).

Import DB & images: `node /var/www/server/import.js`
Run server: `node /var/www/app.js`
Build production: `gulp build`
Build development: `gulp dev`

### 1.7.0
* Improved importer and added verbose options

### 1.6.0
* Blackat now downloads images upon import for self-serving
* Duplicate cards from revised core no longer appear twice
* Duplicate cards from revised core do appear twice when grouped by set

### 1.5.0
* Updated importer to use NRDB 2.0 API
* Moved to node.js as server
* Moved data to Mongo DB storage
* Changed data loading to async http calls
* Moved most content to page bottom to speed loading
* Moved up two increments because what the hell it was a massive change!

### 1.3.1
* Fixed bug with images - NRDB started using full url for imagesrc instead of relative

### 1.3.0
* Added Netrunner DB icons
* Fixed issue with some titles
* Small CSS adjustments

### 1.2.1
* Fixed CSS width issue

### 1.2.0
* Added new sort method - subroutines
* Added cards that say "as an agenda" to the agenda points sort filter
* Stripped un-necessary data from the card list
* Fixed a bug to do with the cookie and changing sides using inapplicable sort methods
* CSS changes

### 1.1.0
* Fixed bug where Sunny LeBeau wouldn't appear due to having no card text
* Added divider titles for cards
* Fixed bug with reset filters
* Separated resetting filters from clearing cookie

### 0.9.9 Initial public release