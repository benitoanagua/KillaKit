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
    style: {
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
  "style" | "media_align" | "aspect_ratio" | "auto_layout"
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
    style=${args.style || "flat"}
    media-align=${args.media_align || "left"}
    aspect-ratio=${args.aspect_ratio || "monitor"}
    ?auto-layout=${args.auto_layout ?? true}
  ></wc-card>
`;

export const Flat: Story = {
  name: "Flat Style",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "flat",
  },
};

export const Elegant: Story = {
  name: "Elegant Style",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "elegant",
  },
};

export const Neumorphism: Story = {
  name: "Neumorphism Style",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "neumorphism",
  },
};

export const Playful: Story = {
  name: "Playful Style",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "playful",
  },
};

export const Brutalist: Story = {
  name: "Brutalist Style",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "brutalist",
  },
};

export const TopAligned: Story = {
  name: "Top Aligned",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "flat",
    media_align: "top",
    aspect_ratio: "video",
  },
};

export const RightAligned: Story = {
  name: "Right Aligned",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "elegant",
    media_align: "right",
  },
};

export const NoImage: Story = {
  name: "Without Image",
  render: (args) => renderCard(args),
  args: {
    ...baseCardData(),
    style: "flat",
    feature_image: "",
  },
};

export const Minimal: Story = {
  name: "Minimal Content",
  render: (args) => renderCard(args),
  args: {
    title: randCatchPhrase(),
    url: randUrl(),
    feature_image: `https://picsum.photos/600/400?random=${randNumber({ min: 1, max: 1000 })}`,
    style: "flat",
    media_align: "top",
  } as CardProps,
};

export const StyleShowcase: Story = {
  name: "All Styles",
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
              style: style as any,
              media_align: "top",
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const LayoutShowcase: Story = {
  name: "Layout Options",
  render: () => html`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      ${[
        { align: "left" as const, label: "Left" },
        { align: "right" as const, label: "Right" },
        { align: "top" as const, label: "Top" },
        { align: "bottom" as const, label: "Bottom" },
      ].map(
        (layout) => html`
          <div>
            <h4 class="text-sm font-medium mb-2 text-onSurfaceVariant">
              ${layout.label} Aligned
            </h4>
            ${renderCard({
              ...baseCardData(),
              style: "flat",
              media_align: layout.align,
            })}
          </div>
        `
      )}
    </div>
  `,
};

export const Playground: Story = {
  name: "Playground",
  render: (args) => html`
    <div class="p-6 max-w-2xl mx-auto">
      <div class="mb-4 p-4 bg-surfaceContainerLow rounded-lg">
        ${renderCard(args)}
      </div>
      <div class="text-sm text-onSurfaceVariant space-y-1">
        <div><strong>Style:</strong> ${args.style}</div>
        <div><strong>Layout:</strong> ${args.media_align}</div>
        <div><strong>Aspect Ratio:</strong> ${args.aspect_ratio}</div>
        <div><strong>Auto Layout:</strong> ${args.auto_layout}</div>
      </div>
    </div>
  `,
  args: {
    ...baseCardData(),
    style: "flat",
    media_align: "left",
    aspect_ratio: "monitor",
    auto_layout: true,
  },
  parameters: {
    controls: { expanded: true },
  },
};
