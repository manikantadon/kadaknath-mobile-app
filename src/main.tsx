import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// Prevent context menu on long-press globally (except on form elements)
document.addEventListener('contextmenu', (e) => {
  const target = e.target as HTMLElement;
  const isFormElement =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable;

  if (!isFormElement) {
    e.preventDefault();
  }
});

// Prevent selection start on non-form elements (additional mobile protection)
document.addEventListener('selectstart', (e) => {
  const target = e.target as HTMLElement;
  const isFormElement =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable;

  if (!isFormElement) {
    e.preventDefault();
  }
});

// Custom pull-to-refresh without default browser indicator
let touchStartY = 0;
let touchCurrentY = 0;
const refreshThreshold = 150; // pixels to trigger refresh
let refreshTriggered = false;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  refreshTriggered = false;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  touchCurrentY = e.touches[0].clientY;
  const deltaY = touchCurrentY - touchStartY;

  // Only trigger if scrolling from top and pulling down
  if (window.scrollY === 0 && deltaY > 0) {
    if (deltaY > refreshThreshold && !refreshTriggered) {
      refreshTriggered = true;
      window.location.reload();
    }
  }
}, { passive: true });

document.addEventListener('touchend', () => {
  touchStartY = 0;
  touchCurrentY = 0;
});

// Register Service Worker for PWA and Mobile Notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker registration failed', err));
  });
}

createRoot(document.getElementById("root")!).render(<App />);