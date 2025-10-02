import { Hct, type DynamicScheme } from "@material/material-color-utilities";

export interface MaterialThemeOptions {
  outputDir?: string;
}

export type SchemeConstructor = new (
  sourceColorHct: Hct,
  isDark: boolean,
  contrastLevel: number
) => DynamicScheme;

export interface StyleConfig {
  name: string;
  variant: SchemeConstructor;
}
