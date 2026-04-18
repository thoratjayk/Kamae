# Bolt's Performance Journal

## 2025-05-15 - [Consolidated Cursor Animation]
**Learning:** Using a JavaScript `requestAnimationFrame` loop for position updates while a CSS `transition: transform` is active on the same element causes rendering conflicts ("fighting" for the property), resulting in visual stuttering (jank).
**Action:** Always remove CSS transitions from properties that are being updated at high frequency via JavaScript.

## 2025-05-15 - [Event Delegation for Interactivity]
**Learning:** Attaching individual listeners to every interactive element (links, buttons) can lead to significant memory overhead and slow initial page load on content-heavy pages.
**Action:** Prefer event delegation on the `document` or a stable parent container for high-frequency UI effects like hover states, especially when content is dynamic.
