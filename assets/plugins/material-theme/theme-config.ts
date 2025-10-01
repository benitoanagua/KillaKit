/**
 * Material Design theme configuration
 * Change values here to automatically regenerate all themes
 *
 * Variants (use the numeric value):
 * 0: MONOCHROME
 * 1: NEUTRAL
 * 2: TONAL_SPOT (default)
 * 3: VIBRANT
 * 4: EXPRESSIVE
 * 5: FIDELITY
 * 6: CONTENT
 */

export interface ThemeConfig {
  seedColor: string;
  contrastLevel: number;
  variant: number;
}

export const themeConfig: ThemeConfig = {
  seedColor: "#660044",
  contrastLevel: 0,
  variant: 3,
};

export const seedColor = themeConfig.seedColor;
export const contrastLevel = themeConfig.contrastLevel;
export const variant = themeConfig.variant;

export function getVariantName(variantNumber: number): string {
  const variantNames: Record<number, string> = {
    0: "MONOCHROME",
    1: "NEUTRAL",
    2: "TONAL_SPOT",
    3: "VIBRANT",
    4: "EXPRESSIVE",
    5: "FIDELITY",
    6: "CONTENT",
  };
  return variantNames[variantNumber] || "TONAL_SPOT";
}
