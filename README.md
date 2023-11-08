<!-- README START -->

# Storybook Addon Kit ([demo](https://main--601ada52c3d4040021afdc30.chromatic.com))

Simplify the creation of Storybook addons

- 📝 Live-editing in development
- ⚛️ React/JSX support
- 📦 Transpiling and bundling with [tsup](https://tsup.egoist.dev/)
- 🏷 Plugin metadata
- 🚢 Release management with [Auto](https://github.com/intuit/auto)
- 🧺 Boilerplate and sample code
- 🛄 ESM support
- 🛂 TypeScript by default with option to eject to JS

### Migrating from Storybook 6.x to 7

Note, if you're looking to upgrade your addon from Storybook 6.x to 7, please refer to the [migration guide](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#70-addon-authors-changes). The major changes are:

- `register.js` was removed
- No more default export from `@storybook/addons`
- `@storybook/api` has been split into `@storybook/preview-api` and `@storybook/manager-api`

Skip this section if you're bootstrapping a new addon.

## Getting Started

Click the **Use this template** button to get started.

![](https://user-images.githubusercontent.com/321738/125058439-8d9ef880-e0aa-11eb-9211-e6d7be812959.gif)

Clone your repository and install dependencies.

```sh
npm install
```

<!-- README END -->

### Development scripts

- `npm run start` runs babel in watch mode and starts Storybook
- `npm run build` build and package your addon code

### Switch from TypeScript to JavaScript

Don't want to use TypeScript? We offer a handy eject command: `npm run eject-ts`

This will convert all code to JS. It is a destructive process, so we recommended running this before you start writing any code.

## What's included?

![Demo](https://user-images.githubusercontent.com/42671/107857205-e7044380-6dfa-11eb-8718-ad02e3ba1a3f.gif)

The addon code lives in `src`. It demonstrates all core addon related concepts. The three [UI paradigms](https://storybook.js.org/docs/react/addons/addon-types#ui-based-addons)

- `src/Tool.tsx`
- `src/Panel.tsx`
- `src/Tab.tsx`

Which, along with the addon itself, are registered in `src/manager.ts`.

Managing State and interacting with a story:

- `src/withGlobals.ts` & `src/Tool.tsx` demonstrates how to use `useGlobals` to manage global state and modify the contents of a Story.
- `src/withRoundTrip.ts` & `src/Panel.tsx` demonstrates two-way communication using channels.
- `src/Tab.tsx` demonstrates how to use `useParameter` to access the current story's parameters.

Your addon might use one or more of these patterns. Feel free to delete unused code. Update `src/manager.ts` and `src/preview.ts` accordingly.

Lastly, configure you addon name in `src/constants.ts`.

### Bundling

Addons have multiple ways of interacting with a Storybook project. It's recommended to understand [the basics](https://storybook.js.org/docs/react/addons/introduction) before diving in.

- Manager entries are used to inject UI or behavior to the Storybook manager UI
- Preview entries are used to inject UI or behavior into the preview iframe where stories are rendered
- Presets are used to alter the configuration of a Storybook similar to how [users can configure their `main.ts` configurations](https://storybook.js.org/docs/react/api/main-config).

Each of these places are different environments where different features and modules are available, therefore it's also recommended to separate and build your modules into the same categories. Addon-kit comes preconfigured with [a bundling configuration](./tsup.config.ts) that supports this separation and you're free to modify and extend it to suit your needs.

You define which modules match which environments in the [`package.json#bundler`](./package.json) property:

- `exportEntries` is a list of module entries that your users can import from manually anywhere they need to. Eg. you could have decorators that users need to import to their `preview.ts` file, or utility functions that can be used in their `main.ts` files.
- `managerEntries` is a list of module entries meant only for the manager UI. These modules will only be bundled to ESM and won't include types, since they are mostly loaded by Storybook directly anyway.
- `managerEntries` is a list of module entries meant only for the preview UI. These modules will only be bundled to ESM and won't include types, since they are mostly loaded by Storybook directly anyway.

#### Globalized packages

Storybook makes a pre-defined set of packages available in the manager UI and in the preview UI. In the final bundle of your addon these packages should not be included, but rather imported directly, which allows Storybook to replace those imports with the actual packages when Storybook is being built.

The list of packages is different between the manager and the preview, which is why there's a slight difference between `managerEntries` and `previewEntries`. Most notably `react` and `react-dom` comes prebundled in the manager, but not in the preview. This means that your manager entries are free to use React to build UI _without_ bundling it in or having a direct reference to it, which is why it's safe to have them as a `devDependency` even though you are using it. _Having React as a peer dependency will unnecessarily require your users to install React._

An exception to the rule above is if you're using React to inject UI into the _preview_, which doesn't come prebundled with React. In those cases you need to move `react` and `react-dom` to a peer dependency. We generally advice against this pattern since this will mean your addon can only be used in React-based Storybooks.

### Metadata

Storybook addons are listed in the [catalog](https://storybook.js.org/addons) and distributed via npm. The catalog is populated by querying npm's registry for Storybook-specific metadata in `package.json`. This project has been configured with sample data. Learn more about available options in the [Addon metadata docs](https://storybook.js.org/docs/react/addons/addon-catalog#addon-metadata).

## Release Management

### Setup

This project is configured to use [auto](https://github.com/intuit/auto) for release management. It generates a changelog and pushes it to both GitHub and npm. Therefore, you need to configure access to both:

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
npx auto create-labels
```

If you check on GitHub, you’ll now see a set of labels that `auto` would like you to use. Use these to tag future pull requests.

#### GitHub Actions

This template comes with GitHub actions already set up to publish your addon anytime someone pushes to your repository.

Go to `Settings > Secrets`, click `New repository secret`, and add your `NPM_TOKEN`.

### Creating a release

To create a release locally you can run the following command, otherwise the GitHub action will make the release for you.

```sh
npm run release
```

That will:

- Build and package the addon code
- Bump the version
- Push a release to GitHub and npm
- Push a changelog to GitHub
