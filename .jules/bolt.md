# Bolt's Performance Journal

## 2025-05-14 - Optimized Cursor Animation and Event Delegation
**Learning:** High-frequency DOM updates (like custom cursors) should always be consolidated into a single requestAnimationFrame loop with hardware acceleration (translate3d) and a 'dirty check' threshold to prevent redundant style writes. Event delegation on the document level is significantly more efficient than individual listeners for interactive elements, especially when content is dynamic.
**Action:** Use requestAnimationFrame and event delegation for all high-frequency or interactive UI patterns.
