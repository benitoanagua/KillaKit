import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: [
    "../assets/stories/**/*.mdx",
    "../assets/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../build"],

  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      watch: {
        ...config.server?.watch,
        ignored: ["!**/build/**"],
      },
    };
    return config;
  },
};

export default config;
