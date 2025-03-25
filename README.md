# Swifties Speed Dating
This is a completely made up app.

## Getting Started
To install and run `Swifties` you will need to use ngrok in order to tunnel to your development machine. Since this is using
the microphone and camera the iOS simulators are unfortunately not sufficient.  You can run the app in the browser in order to get a feel for how it works but it can also be deployed to an iOS device as well.

[more info here]([https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app](https://ngrok.com/downloads/mac-os).

## Compatibility
This package relies on a modified version of `MagicText` and requires `iOS 8` or later. `SwiftUI` support requires `iOS 13` or later.

## Usage
### SwiftUI
- Modify `MagicText` and add in your ngrok tunnel
- Build and run

### swifties-ui
- cd ./swifties-ui
- npm install
- npm run start

## File Server
- cd ./server
- run npm install
- run ./node_modules/.bin/kysely migrate:up
- in another terminal window run npm run dev

## Ngrok
- if on a mac open up /Users/<user>/Library/Application Support/ngrok/ngrok.yml
- add the following lines after agent:
  tunnels:
  ui:
    addr: 3000
    proto: http
  server:
    addr: 8080
    proto: http
- in another terminal window run ngrok start --all
