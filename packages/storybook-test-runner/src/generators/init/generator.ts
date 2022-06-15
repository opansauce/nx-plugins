import {
  addDependenciesToPackageJson,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import type { ProjectConfiguration, Tree } from '@nrwl/devkit';

import { InitGeneratorSchema } from './schema';

export default async function (tree: Tree, options: InitGeneratorSchema) {
  const projectConfig = readProjectConfiguration(tree, options.name);

  assertStorybookTarget(projectConfig);
  addNewTargets(tree, options.name, projectConfig);

  /**
   * TODO:
   * - nice to have: verify storybook 6.5.x is installed
   * - nice to have: add addon interactions plugin to main.js
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

function assertStorybookTarget(projectConfig: ProjectConfiguration) {
  if (typeof projectConfig.targets.storybook !== 'object') {
    throw new Error('Storybook should be configured for this project');
  }
}

function addNewTargets(
  tree: Tree,
  name: string,
  projectConfig: ProjectConfiguration
) {
  const storybookTarget = projectConfig.targets.storybook;

  projectConfig.targets['test-storybook'] = {
    executor: 'nx:run-commands',
    options: {
      command: `test-storybook --url http://localhost:${storybookTarget.options.port} -c ${storybookTarget.options.configDir}`,
    },
  };

  projectConfig.targets['e2e'] = {
    executor: 'nx:run-commands',
    options: {
      command: `concurrently -k -n storybook,test -s command-test "nx run ${name}:storybook" "wait-on tcp:${storybookTarget.options.port} && nx run ${name}:test-storybook"`,
    },
  };

  updateProjectConfiguration(tree, name, projectConfig);
}
