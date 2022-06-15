import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import {
  libraryGenerator,
  storybookConfigurationGenerator,
} from '@nrwl/angular/generators';
import { Linter } from '@nrwl/linter';

import generator from './generator';
import type { InitGeneratorSchema } from './schema';

describe('init generator', () => {
  let appTree: Tree;
  const options: InitGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should fail in case of no storybook target', async () => {
    await libraryGenerator(appTree, {
      name: options.name,
    });

    await expect(generator(appTree, options)).rejects.toThrow(
      'Storybook should be configured for this project'
    );
  });

  it('should generate targets', async () => {
    await libraryGenerator(appTree, {
      name: options.name,
    });
    await storybookConfigurationGenerator(appTree, {
      configureCypress: false,
      name: options.name,
      generateCypressSpecs: false,
      generateStories: false,
      linter: Linter.None,
    });

    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();

    expect(config.targets['test-storybook']).toEqual({
      executor: 'nx:run-commands',
      options: {
        command: `test-storybook --url http://localhost:4400 -c libs/test/.storybook`,
      },
    });
    expect(config.targets['e2e']).toEqual({
      executor: 'nx:run-commands',
      options: {
        command: `concurrently -k -n storybook,test -s command-test "nx run test:storybook" "wait-on tcp:4400 && nx run test:test-storybook"`,
      },
    });
  });
});
