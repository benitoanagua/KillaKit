/**
 * Main entry point for KillKit theme components
 * WordPress-compatible version
 */

import "./main.css";

import "./elements/index.js";

// Global registration for WordPress
if (typeof window !== "undefined") {
  window.dispatchEvent(new CustomEvent("killakit-elements-ready"));

  (window as any).KillKitElements = {
    version: "0.1.0",
    ready: true,
  };

  console.log("KillKit Elements registered successfully");
}

export * from "./elements/index.js";
