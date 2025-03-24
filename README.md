# Swifties Speed Dating
This is a completely made up app.

## Getting Started
To install and run `Swifties` you will need to use ngrok in order to tunnel to your development machine. Since this is using
the microphone and camera the iOS simulators are unfortunately not sufficient.  You can run the app in the browser in order to get a feel for how it works but it can also be deployed to an iOS device as well.

[more info here]([https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app](https://ngrok.com/downloads/mac-os)).

## Compatibility
This package relies on a modified version of `MagicText` and requires `iOS 8` or later. `SwiftUI` support requires `iOS 13` or later.

## Usage

### swifties-ui
- npm install
- npm run start
- in another terminal window run ngrok http https://localhost:3000

### SwiftUI
- Modify `MagicText` and add in your ngrok tunnel
- Build and run

