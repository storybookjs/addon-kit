function config(entry = []) {
  return [...entry, require.resolve("./dist/preview")];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/manager")];
}

module.exports = {
  managerEntries,
  config,
};
