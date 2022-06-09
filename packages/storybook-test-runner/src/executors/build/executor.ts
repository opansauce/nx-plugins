import type { ExecutorContext } from '@nrwl/devkit';
import { readJsonFile } from '@nrwl/devkit';

import { BuildExecutorSchema } from './schema';

export interface PackageJson {
  devDependencies?: Record<string, string>;
}

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const packageJson = readJsonFile<PackageJson>(`${context.root}/package.json`);

  /**
   * TODO:
   * - [ ] check for dependencies with https://github.com/npm/node-semver:
   *   - "@storybook/test-runner": "^0.1.1"
   *   - "@storybook/jest": "^0.0.10"
   *   - concurrently?
   *   - wait-on?
   * - [ ] get project storybook config (configured in options?)
   * - [ ] start storybook dev-server
   * - [ ] wait for it to be done (wait-on?)
   * - [ ] run test-storybook
   * - [ ] kill when one exits
   * - [ ] support for watch mode?
   */
  return {
    success: true,
  };
}
