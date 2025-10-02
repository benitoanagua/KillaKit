// Archivo: assets/stories/Button.stories.ts
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

// Story básico - Default
export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    style: "flat",
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <wc-button
      variant="${args.variant}"
      size="${args.size}"
      style="${args.style}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      ${args.loading ? "Loading..." : "Click me"}
    </wc-button>
  `,
};

// Story para mostrar todos los estilos
export const AllStyles: Story = {
  render: () => html`
    <div class="space-y-6 p-6">
      <h2 class="text-2xl font-bold mb-4">All Button Styles</h2>

      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 capitalize">
              ${style} Style
            </h3>
            <div class="flex gap-2 flex-wrap">
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

// Story para mostrar todos los tamaños
export const AllSizes: Story = {
  render: () => html`
    <div class="space-y-4 p-6">
      <h2 class="text-2xl font-bold mb-4">All Button Sizes</h2>

      ${["sm", "md", "lg", "xl"].map(
        (size) => html`
          <div class="flex items-center gap-4">
            <span class="w-20 text-sm font-medium capitalize">${size}:</span>
            <wc-button style="flat" variant="primary" size="${size}">
              ${size.toUpperCase()} Button
            </wc-button>
            <wc-button style="flat" variant="outline" size="${size}">
              Outline
            </wc-button>
          </div>
        `
      )}
    </div>
  `,
};

// Story para mostrar todos los variants
export const AllVariants: Story = {
  render: () => html`
    <div class="space-y-6 p-6">
      <h2 class="text-2xl font-bold mb-4">All Button Variants</h2>

      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 capitalize">
              ${style} Style
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <wc-button style="${style}" variant="primary" class="w-full"
                  >Primary</wc-button
                >
              </div>
              <div>
                <wc-button style="${style}" variant="secondary" class="w-full"
                  >Secondary</wc-button
                >
              </div>
              <div>
                <wc-button style="${style}" variant="outline" class="w-full"
                  >Outline</wc-button
                >
              </div>
              <div>
                <wc-button style="${style}" variant="ghost" class="w-full"
                  >Ghost</wc-button
                >
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `,
};

// Story para estados
export const States: Story = {
  render: () => html`
    <div class="space-y-6 p-6">
      <h2 class="text-2xl font-bold mb-4">Button States</h2>

      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 capitalize">
              ${style} Style
            </h3>
            <div class="flex gap-2 flex-wrap">
              <wc-button style="${style}" variant="primary">Normal</wc-button>
              <wc-button style="${style}" variant="primary" disabled
                >Disabled</wc-button
              >
              <wc-button style="${style}" variant="primary" loading
                >Loading</wc-button
              >
              <wc-button style="${style}" variant="primary" disabled loading
                >Disabled Loading</wc-button
              >
            </div>
          </div>
        `
      )}
    </div>
  `,
};

// Story interactivo para playground
export const Playground: Story = {
  render: (args) => html`
    <div class="p-6 space-y-6">
      <div class="max-w-md mx-auto">
        <h3 class="text-lg font-semibold mb-4">Button Playground</h3>

        <div class="mb-6 p-4 border rounded-lg bg-surfaceContainerLow">
          <wc-button
            variant="${args.variant}"
            size="${args.size}"
            style="${args.style}"
            ?disabled="${args.disabled}"
            ?loading="${args.loading}"
            class="w-full justify-center"
          >
            ${args.loading
              ? "Loading..."
              : `${args.style} ${args.variant} Button`}
          </wc-button>
        </div>

        <div class="text-sm space-y-2 text-onSurfaceVariant">
          <div><strong>Style:</strong> ${args.style}</div>
          <div><strong>Variant:</strong> ${args.variant}</div>
          <div><strong>Size:</strong> ${args.size}</div>
          <div><strong>Disabled:</strong> ${args.disabled}</div>
          <div><strong>Loading:</strong> ${args.loading}</div>
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
  parameters: {
    controls: { expanded: true },
  },
};
