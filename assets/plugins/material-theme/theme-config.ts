import {
  SchemeTonalSpot,
  SchemeNeutral,
  SchemeVibrant,
  // SchemeExpressive,
  // SchemeMonochrome,
  // SchemeContent,
  // SchemeFidelity,
  SchemeFruitSalad,
  SchemeRainbow,
} from "@material/material-color-utilities";

import type { SchemeConstructor, StyleConfig } from "./types";

export const SEED_COLOR = "#b5007c";

export const STYLE_CONFIGS: StyleConfig[] = [
  {
    name: "flat",
    variant: SchemeNeutral as SchemeConstructor,
  },
  {
    name: "elegant",
    variant: SchemeTonalSpot as SchemeConstructor,
  },
  {
    name: "neumorphism",
    variant: SchemeVibrant as SchemeConstructor,
  },
  {
    name: "playful",
    variant: SchemeRainbow as SchemeConstructor,
  },
  {
    name: "brutalist",
    variant: SchemeFruitSalad as SchemeConstructor,
  },
];
