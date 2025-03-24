//
//  WebView.swift
//  SwiftDate
//
//  Created by Eric Thomas on 3/22/25.
//

import Foundation
import SwiftUI
import MagicText


struct WebView: UIViewRepresentable {
    
    func makeUIView(context: Context) -> MagicTextView {
        return MagicTextView()
        
    }
    
    func updateUIView(_ webView: MagicTextView, context: Context) {
        webView.refresh()
    }
}
