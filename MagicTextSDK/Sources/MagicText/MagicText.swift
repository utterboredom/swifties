import SwiftUI
import WebKit

private let webAppURL = URL(string: "https://6807-2600-8800-1700-383-6c88-e33c-36aa-f014.ngrok-free.app")!

/// Provides the state of loading web content
public enum MagicTextState {
    case loading
    case loaded
    case failed(any Error)
}

/// A UIView subclass that loads the Magic Text Web App
public class MagicTextView: UIView {

    public override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }

    var webView: WKWebView!

    private func setup() {
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.requiresUserActionForMediaPlayback = false
        webConfiguration.allowsInlineMediaPlayback = true
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        
        webView.translatesAutoresizingMaskIntoConstraints = false
 
        addSubview(webView)
        addConstraints([
            webView.leadingAnchor.constraint(equalTo: leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: trailingAnchor),
            webView.topAnchor.constraint(equalTo: topAnchor),
            webView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])

        webView.navigationDelegate = self
    }

    /// Begins a request to load the web app. Calling while a request is in progress has no effect.
    public func refresh() {
        // Make sure a request isn't already in progress
        guard request == nil else { return }

        DispatchQueue.main.async {
            self.onStateChange?(.loading)
        }
        performRequest(kind: .network)
    }

    /// Set this to be notified of web content loading updates
    public var onStateChange: ((MagicTextState) -> Void)?

    private enum RequestKind {
        case network
        case cache
    }

    private var request: RequestKind?

    private func performRequest(kind: RequestKind) {
        request = kind

        let cachePolicy: URLRequest.CachePolicy = switch kind {
        case .network:
            .useProtocolCachePolicy
        case .cache:
            .returnCacheDataElseLoad
        }

        webView.load(URLRequest(url: webAppURL, cachePolicy: cachePolicy))
    }

}

extension MagicTextView: WKNavigationDelegate {

    public func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: any Error) {
        request = nil
        onStateChange?(.failed(error))
    }

    public func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: any Error) {
        switch request {
        case .none:
            break
        case .network:
            performRequest(kind: .cache)
        case .cache:
            request = nil
            onStateChange?(.failed(error))
        }
    }

    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        request = nil
        onStateChange?(.loaded)
    }

}

/// A SwiftUI View that loads the Magic Text Web App
@available(iOS 13.0, *)
public struct MagicText: UIViewRepresentable {
    
    /// - parameter shouldRefresh: set this to `true` to start a new request to load web content
    /// - parameter onStateChange: provide this callback to be notified of web content loading updates
    public init(shouldRefresh: Binding<Bool>, onStateChange: ((MagicTextState) -> Void)? = nil) {
        _shouldRefresh = shouldRefresh
        self.onStateChange = onStateChange
    }

    @Binding private var shouldRefresh: Bool
    private let onStateChange: ((MagicTextState) -> Void)?

    public func makeUIView(context: Context) -> MagicTextView {
        MagicTextView()
    }

    public func updateUIView(_ uiView: MagicTextView, context: Context) {
        uiView.onStateChange = onStateChange

        if shouldRefresh {
            uiView.refresh()
            Task { @MainActor in
                shouldRefresh = false
            }
        }
    }

}
