## 2026-06-10 - Custom Cursor Animation Optimization
**Learning:** Mixing CSS `transition: transform` with JavaScript `requestAnimationFrame` positioning creates a performance "death loop" where the browser fights itself to interpolate values, leading to high CPU usage and visual jank.
**Action:** Always remove CSS transitions from elements positioned via rAF. Use `translate3d` and `will-change: transform` to ensure GPU acceleration, and implement a "dirty check" threshold (e.g., 0.1px) to bypass DOM updates when movement is negligible.
