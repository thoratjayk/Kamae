## 2025-05-14 - [Cursor Performance & Rendering Conflicts]
**Learning:** High-frequency UI updates (like custom cursors) must synchronize DOM writes via `requestAnimationFrame` and disable CSS `transition: transform` to prevent rendering conflicts and main-thread jank. GPU acceleration via `translate3d` and `will-change: transform` is essential for maintaining 60fps.
**Action:** Always consolidate continuous JS-driven animations into a single rAF loop and ensure corresponding CSS transitions are disabled for those specific properties.
