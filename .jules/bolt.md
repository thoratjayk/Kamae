## 2025-05-22 - Cursor Animation Bottleneck
**Learning:** Found that the custom cursor implementation uses both JavaScript `requestAnimationFrame` and CSS `transition: transform` on the same elements, which causes rendering conflicts and unnecessary layout/paint work. Also, hover listeners are attached to every interactive element individually, which doesn't scale and misses dynamic content.
**Action:** Consolidate cursor updates into a single optimized rAF loop, remove conflicting CSS transitions, use `will-change: transform`, and implement event delegation for hover states.
