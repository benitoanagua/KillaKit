import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";
import {
  randUrl,
  randParagraph,
  randFullName,
  randAvatar,
  randNumber,
  randWord,
  randCatchPhrase,
} from "@ngneat/falso";
import type {
  CardProps,
  CardMediaAlign,
  CardAspectRatio,
} from "../types/card.js";

const meta = {
  title: "Components/Card",
  component: "wc-card",
  tags: ["autodocs"],
  argTypes: {
    designStyle: {
      control: { type: "select" },
      options: ["flat", "elegant", "neumorphism", "playful", "brutalist"],
      description: "Visual style variant",
    },
    media_align: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"] as CardMediaAlign[],
      description: "Media alignment",
    },
    aspect_ratio: {
      control: { type: "radio" },
      options: ["monitor", "square", "video"] as CardAspectRatio[],
      description: "Image aspect ratio",
    },
    auto_layout: {
      control: { type: "boolean" },
      description: "Auto switch to column layout on mobile",
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const baseCardData = (): Omit<
  CardProps,
  "designStyle" | "media_align" | "aspect_ratio" | "auto_layout"
> => ({
  title: randCatchPhrase(),
  url: randUrl(),
  excerpt: randParagraph().slice(0, 120) + "...",
  feature_image: `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`,
  tag_name: randWord(),
  tag_url: randUrl(),
  author_name: randFullName(),
  author_url: randUrl(),
  author_profile_image: randAvatar(),
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  published_at: "Nov 15, 2024",
});

const renderCard = (args: CardProps) => html`
  <wc-card
    title=${args.title || ""}
    url=${args.url || ""}
    excerpt=${args.excerpt || ""}
    feature-image=${args.feature_image || ""}
    tag-name=${args.tag_name || ""}
    tag-url=${args.tag_url || ""}
    author-name=${args.author_name || ""}
    author-url=${args.author_url || ""}
    author-profile-image=${args.author_profile_image || ""}
    reading-time=${args.reading_time || ""}
    published-at=${args.published_at || ""}
    design-style=${args.designStyle || "flat"}
    media-align=${args.media_align || "left"}
    aspect-ratio=${args.aspect_ratio || "monitor"}
    ?auto-layout=${args.auto_layout ?? true}
  ></wc-card>
`;

// Variante 1: Todos los estilos de diseño
export const AllStyles: Story = {
  name: "All Design Styles",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      ${["flat", "elegant", "neumorphism", "playful", "brutalist"].map(
        (style) => html`
          <div>
            <h4
              class="text-sm font-medium mb-2 capitalize text-onSurfaceVariant"
            >
              ${style}
            </h4>
            ${renderCard({
              ...baseCardData(),
              designStyle: style as any,
              media_align: "top",
            })}
          </div>
        `
      )}
    </div>
  `,
};

// Variante 2: Diferentes layouts de medios
export const Layouts: Story = {
  name: "Media Layouts",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        { align: "left" as const, label: "Left Aligned" },
        { align: "right" as const, label: "Right Aligned" },
        { align: "top" as const, label: "Top Aligned" },
        { align: "bottom" as const, label: "Bottom Aligned" },
      ].map(
        (layout) => html`
          <div>
            <h4 class="text-sm font-medium mb-2 text-onSurfaceVariant">
              ${layout.label}
            </h4>
            ${renderCard({
              ...baseCardData(),
              designStyle: "flat",
              media_align: layout.align,
            })}
          </div>
        `
      )}
    </div>
  `,
};

// Variante 3: Tarjeta minimalista
export const Minimal: Story = {
  name: "Minimal Card",
  render: (args) => renderCard(args),
  args: {
    title: randCatchPhrase(),
    url: randUrl(),
    feature_image: `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`,
    designStyle: "flat",
    media_align: "top",
  } as CardProps,
};

// Variante 4: Sin imagen
export const NoImage: Story = {
  name: "Card Without Image",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    designStyle: "elegant",
    feature_image: "",
  },
};

// Variante 5: Playground interactivo
export const Playground: Story = {
  name: "Playground",
  render: (args) => html`
    <div class="p-6 max-w-2xl mx-auto">
      <div class="mb-4 p-4 bg-surfaceContainerLow rounded-lg">
        ${renderCard(args)}
      </div>
      <div class="text-sm text-onSurfaceVariant space-y-1">
        <div><strong>Design Style:</strong> ${args.designStyle}</div>
        <div><strong>Layout:</strong> ${args.media_align}</div>
        <div><strong>Aspect Ratio:</strong> ${args.aspect_ratio}</div>
        <div><strong>Auto Layout:</strong> ${args.auto_layout}</div>
        <div><strong>Has Image:</strong> ${!!args.feature_image}</div>
      </div>
    </div>
  `,
  args: {
    ...baseCardData(),
    designStyle: "flat",
    media_align: "left",
    aspect_ratio: "monitor",
    auto_layout: true,
  },
};
