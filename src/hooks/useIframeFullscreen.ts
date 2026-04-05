import { useEffect } from "react";

const FULLSCREEN_ATTRS = [
  ["allow", "fullscreen; autoplay; encrypted-media"],
  ["allowfullscreen", "true"],
  ["webkitallowfullscreen", "true"],
  ["mozallowfullscreen", "true"],
];

const enhanceIframe = (iframe: HTMLIFrameElement) => {
  if (iframe.dataset.fsEnhanced) return;
  iframe.dataset.fsEnhanced = "1";

  // Add fullscreen attributes
  for (const [attr, val] of FULLSCREEN_ATTRS) {
    if (attr === "allow") {
      const existing = iframe.getAttribute("allow") || "";
      const parts = new Set(existing.split(";").map(s => s.trim()).filter(Boolean));
      parts.add("fullscreen");
      parts.add("autoplay");
      parts.add("encrypted-media");
      iframe.setAttribute("allow", [...parts].join("; "));
    } else {
      iframe.setAttribute(attr, val);
    }
  }

  // Add fullscreen button overlay
  const wrapper = iframe.parentElement;
  if (!wrapper) return;

  // Only add button if wrapper doesn't already have one
  if (wrapper.querySelector(".fs-btn-overlay")) return;

  const btn = document.createElement("button");
  btn.className = "fs-btn-overlay";
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
  btn.title = "Fullscreen";
  
  Object.assign(btn.style, {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    zIndex: "10",
    background: "rgba(0,0,0,0.7)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity 0.2s",
    pointerEvents: "auto",
  });

  // Show on hover
  wrapper.style.position = "relative";
  wrapper.addEventListener("mouseenter", () => { btn.style.opacity = "1"; });
  wrapper.addEventListener("mouseleave", () => { btn.style.opacity = "0"; });
  // Always visible on touch
  wrapper.addEventListener("touchstart", () => { btn.style.opacity = "1"; }, { passive: true });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const src = iframe.src || "";
    const el = iframe as any;

    // Try native fullscreen API
    const requestFS =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    if (requestFS) {
      try {
        requestFS.call(el);
        return;
      } catch (_) {
        // fall through
      }
    }

    // Try wrapper fullscreen (helps with some embeds)
    const wrapperEl = wrapper as any;
    const wrapperFS =
      wrapperEl.requestFullscreen ||
      wrapperEl.webkitRequestFullscreen ||
      wrapperEl.mozRequestFullScreen ||
      wrapperEl.msRequestFullscreen;

    if (wrapperFS) {
      try {
        wrapperFS.call(wrapperEl);
        return;
      } catch (_) {
        // fall through
      }
    }

    // Fallback: open in new tab
    if (src) {
      // Clean up Google Drive URLs for direct viewing
      let openUrl = src;
      if (src.includes("drive.google.com") && src.includes("/preview")) {
        openUrl = src.replace("/preview", "/view");
      }
      window.open(openUrl, "_blank");
    }
  });

  wrapper.appendChild(btn);
};

const processAllIframes = (root: HTMLElement | Document = document) => {
  const iframes = root.querySelectorAll<HTMLIFrameElement>("iframe");
  iframes.forEach(enhanceIframe);
};

/**
 * Hook that auto-enhances all iframe embeds with fullscreen support.
 * Uses MutationObserver to catch dynamically added iframes.
 */
export const useIframeFullscreen = () => {
  useEffect(() => {
    // Process existing iframes
    processAllIframes();

    // Watch for new iframes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLIFrameElement) {
            enhanceIframe(node);
          } else if (node instanceof HTMLElement) {
            processAllIframes(node);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};
