import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

const meta = {
  title: "Components/Button",
  component: "wc-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    style: {
      control: { type: "select" },
      options: ["flat", "elegant", "neumorphism", "playful", "brutalist"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const AllStyles: Story = {
  render: () => html`
    <div class="p-6 space-y-8">
      <h2 class="text-2xl font-bold mb-6">All Button Styles</h2>

      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div class="mb-8 p-6 bg-surfaceContainerHigh rounded-lg border">
            <h3 class="text-lg font-semibold mb-4 capitalize">
              ${style} Style
            </h3>
            <div class="flex gap-3 flex-wrap items-center">
              <wc-button style="${style}" variant="primary">Primary</wc-button>
              <wc-button style="${style}" variant="secondary"
                >Secondary</wc-button
              >
              <wc-button style="${style}" variant="outline">Outline</wc-button>
              <wc-button style="${style}" variant="ghost">Ghost</wc-button>
              <wc-button style="${style}" variant="primary" disabled
                >Disabled</wc-button
              >
              <wc-button style="${style}" variant="primary" loading
                >Loading</wc-button
              >
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const StyleComparison: Story = {
  render: () => html`
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Style Comparison</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
          (style) => html`
            <div
              class="p-4 bg-surfaceContainerHigh rounded-lg border text-center"
            >
              <h4 class="font-semibold mb-3 capitalize">${style}</h4>
              <wc-button style="${style}" variant="primary" class="w-full mb-2"
                >Button</wc-button
              >
              <wc-button
                style="${style}"
                variant="primary"
                disabled
                class="w-full"
                >Disabled</wc-button
              >
            </div>
          `
        )}
      </div>
    </div>
  `,
};

export const Playground: Story = {
  render: (args) => html`
    <div class="p-6">
      <div class="max-w-md mx-auto space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Button Playground</h3>
          <p class="text-sm text-onSurfaceVariant">
            Adjust the controls to see changes
          </p>
        </div>

        <wc-button
          style="${args.style}"
          variant="${args.variant}"
          size="${args.size}"
          ?disabled="${args.disabled}"
          ?loading="${args.loading}"
        >
          ${args.loading ? "Loading..." : `${args.style} ${args.variant}`}
        </wc-button>

        <div class="text-sm text-onSurfaceVariant space-y-1">
          <div>Style: ${args.style}</div>
          <div>Variant: ${args.variant}</div>
          <div>Size: ${args.size}</div>
          <div>Disabled: ${args.disabled ? "Yes" : "No"}</div>
          <div>Loading: ${args.loading ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  `,
  args: {
    variant: "primary",
    size: "md",
    style: "flat",
    disabled: false,
    loading: false,
  },
};
