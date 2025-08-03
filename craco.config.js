const path = require("path");
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const ESLintPlugin = require('@craco/craco').ESLintPlugin;

module.exports = {
  webpack: {
    plugins: {
      remove: ['ESLintWebpackPlugin'],
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
      // if new aliases added, it should be added in tsconfig.json too and vice-versa
      "@api": path.resolve(__dirname, "src/api"),
      "@auth": path.resolve(__dirname, "src/auth"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@guards": path.resolve(__dirname, "src/guards"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
};
