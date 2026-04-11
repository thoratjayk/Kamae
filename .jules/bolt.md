## 2026-04-11 - [Cursor Animation Sync]
**Learning:** CSS `transition: transform` conflicts with JavaScript `requestAnimationFrame` updates. When both are active, the browser attempts to interpolate between the frames provided by JS and the transition timing, leading to visual "jank" or stutter.
**Action:** Always remove CSS transitions from properties that are updated frame-by-frame via `requestAnimationFrame`. Use `translate3d` to ensure GPU acceleration and prevent layout thrashing.

## 2026-04-11 - [Event Delegation for Dynamic UI]
**Learning:** Attaching event listeners to many individual elements (O(N)) is memory-intensive and fails for content loaded dynamically (e.g., via AJAX/fetch).
**Action:** Use event delegation on a stable parent or `document` to manage interactive states efficiently (O(1) memory) and ensure persistence across DOM updates.
