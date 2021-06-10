#!/usr/local/bin/node

const chalk = require("chalk");
const packageJson = require("../package.json");

const name = packageJson.name;
const displayName = packageJson.storybook.displayName;

if (name.includes("addon-kit") || displayName.includes("Addon Kit")) {
  console.error(
    chalk.red.bold`
⚠️  Please configure appropriate metadata before publishing your addon.
      `,
    chalk.red`
Your package name and/or displayName includes default values from the Addon Kit.
The addon gallery filters out all such addons.

For more info on addon metadata, see: https://storybook.js.org/docs/react/addons/addon-catalog#addon-metadata
  `
  );

  process.exit(1);
}
