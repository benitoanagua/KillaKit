export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ButtonStyle =
  | "flat"
  | "elegant"
  | "neumorphism"
  | "playful"
  | "brutalist";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ButtonStyle;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}
