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

// Register Service Worker for PWA and Mobile Notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker registration failed', err));
  });
}

createRoot(document.getElementById("root")!).render(<App />);