import { defineConfig, type Options } from "tsup";
import { readFile } from "fs/promises";
import { join } from "path";

// temporarily hardocded until https://github.com/storybookjs/storybook/pull/24676 is released so we can import the lists instead
const globalManagerPackages = [
  'react',
  'react-dom',
  '@storybook/components',
  '@storybook/channels',
  '@storybook/core-events',
  '@storybook/router',
  '@storybook/theming',
  '@storybook/api',
  '@storybook/manager-api',
  '@storybook/addons',
  '@storybook/client-logger',
  '@storybook/types',
]

const globalPreviewPackages = [
  '@storybook/addons',
  '@storybook/global',
  '@storybook/channel-postmessage', 
  '@storybook/channel-websocket', 
  '@storybook/channels',
  '@storybook/client-api',
  '@storybook/client-logger',
  '@storybook/core-client',
  '@storybook/core-events',
  '@storybook/preview-web',
  '@storybook/preview-api',
  '@storybook/store',
  '@storybook/types',
];

const BROWSER_TARGET: Options['target'] = ["chrome100", "safari15", "firefox91"];
const NODE_TARGET: Options['target'] = ["node16"];

type BundlerConfig = {
  bundler?: {
    exportEntries?: string[];
    nodeEntries?: string[];
    managerEntries?: string[];
    previewEntries?: string[];
  };
};

export default defineConfig(async (options) => {
  const packageJson = await readFile('./package.json', 'utf8').then(JSON.parse) as BundlerConfig;
  const {
    bundler: {
      exportEntries = [],
      managerEntries = [],
      previewEntries = [],
    } = {},
  } = packageJson;

  const commonConfig: Options = {
    splitting: false,
    minify: !options.watch,
    treeshake: true,
    sourcemap: true,
    clean: true,
  };

  const configs: Options[] = [];

  if (exportEntries.length) {
    configs.push({
      ...commonConfig,
      entry: exportEntries,
      dts: {
        resolve: true,
      },
      format: ["esm", 'cjs'],
      target: [...BROWSER_TARGET, ...NODE_TARGET],
      platform: "neutral",
      external: [...globalManagerPackages, ...globalPreviewPackages],
    });
  }

  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      format: ["esm"],
      target: BROWSER_TARGET,
      platform: "browser",
      external: globalManagerPackages,
    });
  }

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      format: ["esm"],
      target: BROWSER_TARGET,
      platform: "browser",
      external: globalPreviewPackages,
    });
  }

  return configs;
});
