import { WcCard } from "./Card.js";
import { WcButton } from "./Button.js";

export { WcCard, WcButton };

declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
    "wc-button": WcButton;
  }
}
