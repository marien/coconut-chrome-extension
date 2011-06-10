# Coconut Chrome Extension
Coconut Chrome Extension is a Google Chrome extension for Coconut: the enterprise social network as found on http://coconutcenter.com.

## Features
* Keyboard navigation using jquery.hotkeys from http://github.com/tzuryby/jquery.hotkeys.
* Toolbar icon showing unread forum threads count.
* Click on toolbar icon to open a new Coconut tab or switch to the nearest open Coconut tab.

## Usage
Fork or otherwise download the extension. Open chrome://extensions/ in Google Chrome. Open developer mode and add an extracted extension.
The extension only works on https://coconut.ogd.nl and https://*.coconut.ogd.nl as per config in manifest.json.

## Development hints
Google Chrome won't autoload your changes to the extension. After editing, go to chrome://extensions/ to reload the extension and reload any pages you want to test your changes on.