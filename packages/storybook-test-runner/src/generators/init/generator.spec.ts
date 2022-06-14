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

  it('should run successfully', async () => {
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
  });

  it('should fail in case of no storybook target', async () => {
    await libraryGenerator(appTree, {
      name: options.name,
    });

    await expect(generator(appTree, options)).rejects.toThrow(
      'Storybook should be configured for this project'
    );
  });
});
