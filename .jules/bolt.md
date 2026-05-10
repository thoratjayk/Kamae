# ⚡ Bolt Performance Journal

## 2025-05-10 - Consolidating UI Animations
**Learning:** High-frequency events like `mousemove` should only update state variables. DOM manipulations should be batched in a `requestAnimationFrame` loop using `translate3d` to prevent layout thrashing and leverage GPU acceleration. Additionally, `transition: transform` on elements moved by JS causes rendering conflicts and jank.
**Action:** Consolidate cursor updates into a single rAF loop and remove conflicting CSS transitions.

## 2025-05-10 - Pointer Event Delegation and rAF Optimization
**Learning:** Document-level event delegation for hover states using `mouseover`/`mouseout` can cause "flicker" if the cursor moves between children of an interactive element. This is solved by checking `e.relatedTarget.closest()`. Also, an idle `requestAnimationFrame` loop still incurs some cost; a "dirty check" (comparing current vs. last values) avoids redundant DOM updates when the mouse is stationary.
**Action:** Use `relatedTarget` for robust hover delegation and implement coordinate-based dirty checks in rAF loops.
