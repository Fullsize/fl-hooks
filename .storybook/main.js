/** @type { import('@storybook/react-vite').StorybookConfig } */
const { mergeConfig } = require('vite');

const config = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: { foo: 'bar' },
      },
    });
  },
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
  staticDirs: ['../public'],
  docs: {
    autodocs: "tag",
  },
};
export default config;
