# Bolt's Performance Journal

## 2025-05-15 - [Consolidated Animation Loops & Event Delegation]
**Learning:** High-frequency UI updates (like custom cursors) should be consolidated into a single `requestAnimationFrame` loop and use `translate3d` to leverage GPU acceleration and avoid layout thrashing. Attaching individual event listeners to many interactive elements (links, buttons) is memory-intensive and fails for dynamically added content; document-level event delegation is more efficient.
**Action:** Consolidate cursor updates into one rAF loop, use hardware-accelerated transforms, and implement event delegation for interactive states.
