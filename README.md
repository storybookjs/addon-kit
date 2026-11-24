<!-- README START -->

# Storybook Addon Kit

Simplify the creation of Storybook addons

- 📝 Live-editing in development
- ⚛️ React/JSX support
- 📦 Transpiling and bundling with [tsup](https://tsup.egoist.dev/)
- 🏷 Plugin metadata
- 🚢 Release management with [Auto](https://github.com/intuit/auto)
- 🧺 Boilerplate and sample code
- 🛄 ESM-only, matching modern Storybook
- 🛂 TypeScript by default with option to eject to JS

### Migrating to a later Storybook version

If you have an existing addon that you want to migrate to support the latest version of Storybook, you can check out the [addon migration guide](https://storybook.js.org/docs/addons/addon-migration-guide).

## Getting Started

Click the **Use this template** button to get started.

Clone your repository and install dependencies:

```sh
pnpm install
```

The postinstall script will ask you a few questions (package name, author, display name, …) and fill in the metadata of your addon for you.

<!-- README END -->

### Requirements

- Node.js 22.12 or later
- [pnpm](https://pnpm.io), which this template uses as its package manager

### Development scripts

- `pnpm start` rebuilds the addon code in watch mode and starts the test Storybook
- `pnpm build` builds and packages your addon code

### Switch from TypeScript to JavaScript

Don't want to use TypeScript? We offer a handy eject command: `pnpm eject-ts`

This will convert all code to JS. It is a destructive process, so we recommended running this before you start writing any code.

## What's included?

![Demo of the example addon that ships with the addon kit](media/demo.gif)

The addon code lives in `src`. It demonstrates all core addon related concepts. The two [UI paradigms](https://storybook.js.org/docs/addons/addon-types#ui-based-addons)

- `src/components/Tool.tsx`
- `src/components/Panel.tsx`

Which, along with the addon itself, are registered in `src/manager.tsx`.

Managing State and interacting with a story:

- `src/withGlobals.ts` & `src/components/Tool.tsx` demonstrates how to use `useGlobals` to manage global state and modify the contents of a Story.
- `src/withRoundTrip.ts` & `src/components/Panel.tsx` demonstrates two-way communication using channels.
- `src/manager-helpers.tsx` demonstrates how to ship opt-in helpers that users import in their own `.storybook/manager.ts`, like the `renderLabel` function that decorates sidebar labels.

The addon's preview annotations (decorators and initial globals) are defined in `src/preview.ts`, and `src/index.ts` exposes them as a typed entry point via `definePreviewAddon`.

Your addon might use one or more of these patterns. Feel free to delete unused code. Update `src/manager.tsx` and `src/preview.ts` accordingly.

Lastly, configure your addon name in `src/constants.ts`.

### Bundling

Addons can interact with a Storybook project in multiple ways. It is recommended to familiarize yourself with [the basics](https://storybook.js.org/docs/addons) before getting started.

- Manager entries are used to add UI or behavior to the Storybook manager UI.
- Preview entries are used to add UI or behavior to the preview iframe where stories are rendered.
- Presets are used to modify the Storybook configuration, similar to how [users can configure their `main.ts` configurations](https://storybook.js.org/docs/api/main-config/main-config).

Since each of these places represents a different environment with different features and modules, it is also recommended to split and build your modules accordingly. This addon-kit comes with a preconfigured [bundling configuration](./tsup.config.ts) that supports this split, and you are free to modify and extend it as needed.

You can define which modules match which environments in the [`package.json#bundler`](./package.json) property:

- `managerEntries` is a list of module entries meant only for the manager UI. These modules will be bundled to ESM and won't include types since they are mostly loaded by Storybook directly.
- `previewEntries` is a list of module entries meant only for the preview UI. These modules will be bundled to ESM and include types, so that users can import them when setting up Portable Stories or CSF factories.
- `nodeEntries` is a list of module entries meant only for Node, such as presets. These modules will be bundled to ESM targeting Node.

The addon is bundled to ESM only, as modern Storybook is ESM-only itself.

#### Globalized packages

Storybook provides a predefined set of packages that are available in the manager UI and the preview UI. In the final bundle of your addon, these packages should not be included. Instead, the imports should stay in place, allowing Storybook to replace those imports with the actual packages during the Storybook build process.

The list of packages differs between the manager and the preview, which is why there is a slight difference between `managerEntries` and `previewEntries`. Most notably, `react` and `react-dom` are prebundled in the manager but not in the preview. This means that your manager entries can use React to build UI without bundling it or having a direct reference to it. Therefore, it is safe to have React as a `devDependency` even though you are using it in production. _Requiring React as a peer dependency would unnecessarily force your users to install React._

An exception to this rule is if you are using React to inject UI into the preview, which does not come prebundled with React. In such cases, you need to move `react` and `react-dom` to a peer dependency. However, we generally advise against this pattern since it would limit the usage of your addon to React-based Storybooks.

### Metadata

Storybook addons are listed in the [catalog](https://storybook.js.org/addons) and distributed via npm. The catalog is populated by querying npm's registry for Storybook-specific metadata in `package.json`. This project has been configured with sample data. Learn more about available options in the [Addon metadata docs](https://storybook.js.org/docs/addons/integration-catalog#addon-metadata).

## Documentation

To help the community use your addon and understand its capabilities, please document it thoroughly.

To get started, replace this README with the content in this sample template.

### Sample documentation template

````md
# My Addon

## Installation

Run the following command to install and register the addon:

```sh
npx storybook add my-addon
```

This installs the package and registers the addon in your Storybook configuration for you.

### Manual install

First, install the package.

```sh
npm install --save-dev my-addon
```

Then, register it as an addon in `.storybook/main.ts`.

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-vite, nextjs-vite)
import { defineMain } from '@storybook/your-framework/node';

export default defineMain({
  // ...rest of config
  addons: [
    '@storybook/addon-docs',
    'my-addon', // 👈 register the addon here
  ],
});
```

Finally, register the addon's preview annotations in `.storybook/preview.ts`.

```ts
// .storybook/preview.ts

// Replace your-framework with the framework you are using (e.g., react-vite, nextjs-vite)
import { definePreview } from '@storybook/your-framework';

import myAddon from 'my-addon';

export default definePreview({
  // ...rest of preview
  addons: [myAddon()], // 👈 register the addon here
});
```

## Usage

The primary way to use this addon is to define the `exampleParameter` parameter. You can do this the
component level, as below, to affect all stories in the file, or you can do it for a single story.

```ts
// Button.stories.ts

import preview from '#.storybook/preview';

import { Button } from './Button';

const meta = preview.meta({
  component: Button,
  parameters: {
    myAddon: {
      exampleParameter: true,
      // See API section below for available parameters
    },
  },
});

export default meta;
```

Another way to use the addon is...

## API

### Parameters

This addon contributes the following parameters to Storybook, under the `myAddon` namespace:

#### `disable`

Type: `boolean`

Disable this addon's behavior. This parameter is most useful to allow overriding at more specific
levels. For example, if this parameter is set to true at the project level, it could then be
re-enabled by setting it to false at the meta (component) or story level.

### Options

When registering this addon, you can configure it with the following options, which are passed when
registering the addon, like so:

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-vite, nextjs-vite)
import { defineMain } from '@storybook/your-framework/node';

export default defineMain({
  // ...rest of config
  addons: [
    '@storybook/addon-docs',
    {
      name: 'my-addon',
      options: {
        // 👈 options for my-addon go here
      },
    },
  ],
});
```

#### `useExperimentalBehavior`

Type: `boolean`

Enable experimental behavior to...
````

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm.

In CI, the release workflow authenticates to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), so it does not need an npm token. To release locally instead, you need access to both services:

- [`NPM_TOKEN`](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) Create a token with both _Read and Publish_ permissions.
- [`GH_TOKEN`](https://github.com/settings/tokens) Create a token with the `repo` scope.

Then open your `package.json` and edit the following fields:

- `name`
- `author`
- `repository`

#### Local

To use `auto` locally create a `.env` file at the root of your project and add your tokens to it:

```bash
GH_TOKEN=<value you just got from GitHub>
NPM_TOKEN=<value you just got from npm>
```

Lastly, **create labels on GitHub**. You’ll use these labels in the future when making changes to the package.

```bash
pnpm exec auto create-labels
```

If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull requests.

#### GitHub Actions

This template comes with GitHub actions already set up to publish your addon anytime someone pushes to your repository.

Instead of adding an `NPM_TOKEN` secret, register the release workflow as a [trusted publisher](https://docs.npmjs.com/trusted-publishers) in your package's settings on npm.

### Creating a release

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
pnpm release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
