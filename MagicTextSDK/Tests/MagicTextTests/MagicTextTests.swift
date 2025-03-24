import XCTest
@testable import MagicText

final class MagicTextTests: XCTestCase {
    func testMagicTextState() throws {
        let view = MagicTextView()
        
        let loadingExpectation = XCTestExpectation(description: "Loading")
        let loadedOrFailedExpectation = XCTestExpectation(description: "Loaded or Failed")

        view.onStateChange = {
            switch $0 {
            case .loading:
                loadingExpectation.fulfill()
            case .loaded, .failed(_):
                loadedOrFailedExpectation.fulfill()
            }
        }

        view.refresh()

        wait(for: [loadingExpectation, loadedOrFailedExpectation], enforceOrder: true)
    }
}
