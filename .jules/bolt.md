## 2025-05-15 - Consolidating Animation Loops and Resolving CSS Conflicts
**Learning:** Having CSS `transition: transform` on elements updated via `requestAnimationFrame` creates rendering conflicts and "jank," as the browser tries to animate between frames already being managed by JS.
**Action:** Always remove CSS transitions for properties managed by high-frequency JS loops and use `will-change: transform` to hint GPU acceleration.
