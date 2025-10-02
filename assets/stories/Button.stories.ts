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
    designStyle: {
      control: { type: "select" },
      options: ["flat", "elegant", "neumorphism", "playful", "brutalist"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// Variante 1: Botón por defecto
export const Default: Story = {
  name: "Default Button",
  args: {
    variant: "primary",
    size: "md",
    designStyle: "flat",
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <wc-button
      variant="${args.variant}"
      size="${args.size}"
      design-style="${args.designStyle}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      ${args.loading ? "Loading..." : "Click me"}
    </wc-button>
  `,
};

// Variante 2: Todos los estilos visuales
export const AllStyles: Story = {
  name: "All Design Styles",
  render: () => html`
    <div class="space-y-6 p-6">
      <h2 class="text-2xl font-bold mb-4">All Design Styles</h2>

      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 capitalize">${style}</h3>
            <div class="flex gap-2 flex-wrap">
              <wc-button design-style="${style}" variant="primary">
                Primary ${style}
              </wc-button>
              <wc-button design-style="${style}" variant="secondary">
                Secondary
              </wc-button>
              <wc-button design-style="${style}" variant="outline">
                Outline
              </wc-button>
            </div>
          </div>
        `
      )}
    </div>
  `,
};

// Variante 3: Todos los tamaños
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => html`
    <div class="space-y-4 p-6">
      <h2 class="text-2xl font-bold mb-4">Button Sizes</h2>

      ${["sm", "md", "lg", "xl"].map(
        (size) => html`
          <div class="flex items-center gap-4">
            <span class="w-20 text-sm font-medium capitalize">${size}:</span>
            <wc-button design-style="flat" variant="primary" size="${size}">
              ${size.toUpperCase()} Button
            </wc-button>
          </div>
        `
      )}
    </div>
  `,
};

// Variante 4: Estados del botón
export const States: Story = {
  name: "Button States",
  render: () => html`
    <div class="space-y-6 p-6">
      <h2 class="text-2xl font-bold mb-4">Button States</h2>

      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-3">Normal vs Disabled</h3>
        <div class="flex gap-2 flex-wrap">
          <wc-button design-style="flat" variant="primary">Normal</wc-button>
          <wc-button design-style="flat" variant="primary" disabled>
            Disabled
          </wc-button>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-3">Loading States</h3>
        <div class="flex gap-2 flex-wrap">
          <wc-button design-style="flat" variant="primary" loading>
            Loading
          </wc-button>
          <wc-button design-style="flat" variant="primary" disabled loading>
            Disabled Loading
          </wc-button>
        </div>
      </div>
    </div>
  `,
};

// Variante 5: Playground interactivo
export const Playground: Story = {
  name: "Playground",
  render: (args) => html`
    <div class="p-6 max-w-md mx-auto">
      <div class="mb-6 p-4 border rounded-lg bg-surfaceContainerLow">
        <wc-button
          variant="${args.variant}"
          size="${args.size}"
          design-style="${args.designStyle}"
          ?disabled="${args.disabled}"
          ?loading="${args.loading}"
          class="w-full justify-center"
        >
          ${args.loading
            ? "Loading..."
            : `${args.designStyle} ${args.variant} Button`}
        </wc-button>
      </div>

      <div class="text-sm space-y-2 text-onSurfaceVariant">
        <div><strong>Design Style:</strong> ${args.designStyle}</div>
        <div><strong>Variant:</strong> ${args.variant}</div>
        <div><strong>Size:</strong> ${args.size}</div>
        <div><strong>Disabled:</strong> ${args.disabled}</div>
        <div><strong>Loading:</strong> ${args.loading}</div>
      </div>
    </div>
  `,
  args: {
    variant: "primary",
    size: "md",
    designStyle: "flat",
    disabled: false,
    loading: false,
  },
};
