/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/*.mdx", "../stories/*.tsx", "../stories/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    '@storybook/addon-docs'
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ['../stories/public'],
  docs: {
    autodocs: "tag",
  },
};
export default config;
