import { WcCard } from "./Card.js";

export {
  WcCard,
};

declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
  }
}
