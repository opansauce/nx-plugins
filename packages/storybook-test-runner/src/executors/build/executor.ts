import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema) {
  /**
   * TODO:
   * - [ ] check for dependencies:
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
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}
