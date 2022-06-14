import {
  addDependenciesToPackageJson,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';

import { InitGeneratorSchema } from './schema';

export default async function (tree: Tree, options: InitGeneratorSchema) {
  const projectConfig = readProjectConfiguration(tree, options.name);

  if (typeof projectConfig.targets.storybook !== 'object') {
    throw new Error('Storybook should be configured for this project');
  }
  // TODO: verify storybook 6.5.x is installed

  /**
   * TODO:
   * - add addon interactions plugin to main.js
   * - add test-storybook target
   * - add e2e target
   * - implement e2e
   */

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@storybook/addon-interactions': '^6.5.9',
      '@storybook/jest': '^0.0.10',
      '@storybook/test-runner': '^0.1.1',
      '@storybook/testing-library': '^0.0.13',
      concurrently: '^7.2.1',
      'wait-on': '^6.0.1',
    }
  );
}
