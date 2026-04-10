## 2025-05-15 - [Cursor Animation & Event Delegation Optimization]
**Learning:** Combining CSS `transition: transform` with a JavaScript `requestAnimationFrame` loop causes rendering conflicts and jank. Additionally, attaching individual listeners to numerous interactive elements is memory-intensive and fails for dynamic content.
**Action:** Always remove CSS transform transitions when using JS loops, use `translate3d` for GPU acceleration, and prefer event delegation on the document level for UI effects.
