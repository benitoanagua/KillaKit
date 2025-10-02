import { LitElement, PropertyValues } from "lit";
import { THEME_CSS_VARS, type ThemeCssVar } from "../types/material.js";
import { type ThemeChangeEvent } from "../types/events.js";

type ThemeStyle = "flat" | "elegant" | "neumorphism" | "playful" | "brutalist";

export function ThemeAwareMixin<T extends new (...args: any[]) => LitElement>(
  Base: T
) {
  return class ThemeAware extends Base {
    protected currentTheme = "light";
    protected currentStyle: ThemeStyle = "flat";
    private themeObserver?: MutationObserver;
    private tempElement: HTMLDivElement | null = null;

    static get properties() {
      return {
        currentTheme: { type: String },
        currentStyle: { type: String },
        style: { type: String },
      };
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.setupThemeListener();
      this.updateThemeVars();
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.cleanupThemeListener();
      this.cleanupTempElement();
    }

    updated(changedProperties: PropertyValues) {
      super.updated?.(changedProperties);

      if (
        changedProperties.has("style") ||
        changedProperties.has("currentTheme")
      ) {
        this.currentStyle = (this as any).style || "flat";
        this.updateThemeVars();
      }
    }

    private setupThemeListener() {
      window.addEventListener(
        "theme-change",
        this.handleThemeChange as EventListener
      );

      this.themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-theme"
          ) {
            this.updateThemeVars();
          }
        });
      });

      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    private cleanupThemeListener() {
      window.removeEventListener(
        "theme-change",
        this.handleThemeChange as EventListener
      );
      this.themeObserver?.disconnect();
    }

    private cleanupTempElement() {
      if (this.tempElement && this.tempElement.parentNode) {
        this.tempElement.parentNode.removeChild(this.tempElement);
      }
      this.tempElement = null;
    }

    private handleThemeChange = (event: Event) => {
      const customEvent = event as ThemeChangeEvent;
      this.currentTheme = customEvent.detail?.theme || "light";
      this.updateThemeVars();
    };

    protected updateThemeVars() {
      const themeStyle = this.shadowRoot?.getElementById("theme-vars");
      if (!themeStyle) {
        this.ensureThemeStyleElement();
        return;
      }

      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      this.currentTheme = theme;

      const componentStyle = (this as any).style || "flat";
      this.currentStyle = componentStyle;

      // Reutilizar o crear elemento temporal
      if (!this.tempElement) {
        this.tempElement = document.createElement("div");
        this.tempElement.style.cssText =
          "position: absolute; visibility: hidden; pointer-events: none;";
        document.body.appendChild(this.tempElement);
      }

      // Aplicar clase del tema
      this.tempElement.className = `${componentStyle}-theme`;
      if (theme === "dark") {
        this.tempElement.setAttribute("data-mode", "dark");
      } else {
        this.tempElement.removeAttribute("data-mode");
      }

      // Extraer variables CSS
      const computedStyle = getComputedStyle(this.tempElement);

      const cssVars = THEME_CSS_VARS.map((varName: ThemeCssVar) => {
        const value = computedStyle
          .getPropertyValue(`--color-${varName}`)
          .trim();
        return `--color-${varName}: ${value || "#000000"};`;
      }).join("\n");

      themeStyle.textContent = `:host { ${cssVars} }`;
    }

    private ensureThemeStyleElement() {
      if (!this.shadowRoot) return;

      let themeStyle = this.shadowRoot.getElementById("theme-vars");
      if (!themeStyle) {
        themeStyle = document.createElement("style");
        themeStyle.id = "theme-vars";
        this.shadowRoot.appendChild(themeStyle);
      }

      setTimeout(() => this.updateThemeVars(), 0);
    }

    // Método opcional para aplicar clase al host (útil para CSS global)
    protected applyThemeClass() {
      if (this.shadowRoot?.host) {
        const themeClasses = [
          "flat-theme",
          "elegant-theme",
          "neumorphism-theme",
          "playful-theme",
          "brutalist-theme",
        ];
        themeClasses.forEach((themeClass) => {
          this.shadowRoot!.host.classList.remove(themeClass);
        });
        this.shadowRoot.host.classList.add(`${this.currentStyle}-theme`);
      }
    }
  };
}
