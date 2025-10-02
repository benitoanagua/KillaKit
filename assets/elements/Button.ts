import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { ButtonVariant, ButtonSize, ButtonStyle } from "../types/button";
import { ThemeAwareMixin } from "../mixins/ThemeAwareMixin.js";

const ThemeAwareBase = ThemeAwareMixin(LitElement);

@customElement("wc-button")
export class WcButton extends ThemeAwareBase {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) variant: ButtonVariant = "primary";
  @property({ type: String }) size: ButtonSize = "md";
  @property({ type: String, attribute: "design-style" })
  designStyle: ButtonStyle = "flat";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();
    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);
    return shadowRoot;
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has("designStyle")) {
      this.currentStyle = this.designStyle;
      this.updateThemeVars();
      this.applyThemeClass();
    }
  }

  private getButtonClasses() {
    const baseClasses = [
      "wc-button",
      `wc-button-${this.variant}`,
      `wc-button-${this.size}`,
      `wc-button-style-${this.designStyle}`,
    ];

    if (this.loading) baseClasses.push("wc-button-loading");
    if (this.disabled) baseClasses.push("wc-button-disabled");

    return baseClasses.join(" ");
  }

  render() {
    return html`
      <button
        class="${this.getButtonClasses()}"
        ?disabled="${this.disabled || this.loading}"
        type="${this.type}"
        aria-busy="${this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
          ? html`
              <span class="wc-button-spinner" aria-hidden="true"></span>
              <span class="sr-only">Loading</span>
            `
          : ""}
        <span class="wc-button-content">
          <slot></slot>
        </span>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.dispatchEvent(
      new CustomEvent("wc-click", {
        detail: {
          variant: this.variant,
          size: this.size,
          designStyle: this.designStyle,
          nativeEvent: e,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}
