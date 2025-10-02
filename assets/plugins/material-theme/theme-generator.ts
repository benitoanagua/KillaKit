import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import {
  argbFromHex,
  hexFromArgb,
  MaterialDynamicColors,
  Hct,
} from "@material/material-color-utilities";
import { THEME_CSS_VARS } from "../../types/material";
import { SEED_COLOR, STYLE_CONFIGS } from "./theme-config";
import type { StyleConfig } from "./types";

function extractColors(scheme: any) {
  const colors: Record<string, string> = {};
  for (const prop of THEME_CSS_VARS) {
    try {
      const color = (MaterialDynamicColors as any)[prop]?.getArgb(scheme);
      colors[prop] = hexFromArgb(color);
    } catch {
      colors[prop] = "#FF00FF";
      console.warn(`Could not extract color property: ${prop}`);
    }
  }
  return colors;
}

function generateThemeFile(styleConfig: StyleConfig, outputDir: string) {
  const { name, variant: SchemeConstructor } = styleConfig;

  console.log(`   • ${name.toUpperCase()}`);

  const lightScheme = new SchemeConstructor(
    Hct.fromInt(argbFromHex(SEED_COLOR)),
    false,
    0
  );
  const darkScheme = new SchemeConstructor(
    Hct.fromInt(argbFromHex(SEED_COLOR)),
    true,
    0
  );

  const lightColors = extractColors(lightScheme);
  const darkColors = extractColors(darkScheme);

  const cssContent = `@theme {
${THEME_CSS_VARS.map((k) => `  --color-${k}: ${lightColors[k]};`).join("\n")}
}

[data-theme="dark"] {
${THEME_CSS_VARS.map((k) => `  --color-${k}: ${darkColors[k]};`).join("\n")}
}

.${name}-theme {
${THEME_CSS_VARS.map((k) => `  --color-${k}: ${lightColors[k]};`).join("\n")}
}

.${name}-theme[data-mode="dark"] {
${THEME_CSS_VARS.map((k) => `  --color-${k}: ${darkColors[k]};`).join("\n")}
}
`;

  const styleDir = resolve(outputDir, name);
  mkdirSync(styleDir, { recursive: true });

  writeFileSync(resolve(styleDir, "material-theme.css"), cssContent);

  return { name, path: `${name}/material-theme.css` };
}

export function generateThemeFiles(root: string, outputDir: string): void {
  try {
    console.log("🎨 Generating 5 Material Design Theme Variants...");
    console.log(`   🎨 Seed color: ${SEED_COLOR}\n`);

    const generatedThemes = STYLE_CONFIGS.map((config) =>
      generateThemeFile(config, resolve(root, outputDir))
    );

    console.log("\n✅ 5 theme variants generated successfully:");
    generatedThemes.forEach((theme) => {
      console.log(`   📁 ${theme.path}`);
    });

    console.log("\n🎨 Usage:");
    console.log(`   • Import: @import "./styles/flat/material-theme.css";`);
    console.log(`   • Use class: <div class="flat-theme">...</div>`);
    console.log(`   • Use data attribute: <div data-theme="flat">...</div>`);
  } catch (error) {
    console.error("❌ Error generating themes:", error);
    throw error;
  }
}
