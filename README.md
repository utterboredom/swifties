# MagicText SDK
This package provides `UIKit` and `SwiftUI` wrappers around a WebView presenting a web app.

## Getting Started
To use `MagicText` in your own project, you need to set it up as a local package dependency.
 - Open your Xcode project.
 - Go to File → Add Packages.
 - Click the Add Local button (bottom-left corner).
 - Select the folder containing your Swift package.

[more info here](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).

## Compatibility
This package relies on `WKWebView` and requires `iOS 8` or later. `SwiftUI` support requires `iOS 13` or later.

## Usage

### UIKit
`MagicTextView` is a `UIView` subclass. Call it's `refresh` function to load the web app. You can be notified about state updates (loading, loaded, and failure) by setting the `onStateChange` callback.

### SwiftUI
`MagicText` is a `View`. Pass a `shouldRefresh` binding to its initializer to indicate when the web app should load its content. Pass an `onStateChange` callback to its initializer to react to state updates.

## Caching
If loading the web app fails, the library will automatically fall back to a cached version if it is available.
