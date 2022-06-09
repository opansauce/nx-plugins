const readJsonFile = jest.fn(() => ({
  devDependencies: { test: '1.0.0' },
  dependencies: { test: '1.0.0' },
}));
import { BuildExecutorSchema } from './schema';
import executor from './executor';
import type { ExecutorContext } from '@nrwl/devkit';

jest.mock('@nrwl/devkit', () => ({
  readJsonFile,
}));

const options: BuildExecutorSchema = {};
const mockContext: ExecutorContext = {
  root: '/root',
  cwd: '/root',
  isVerbose: true,
  workspace: {
    version: 2,
    projects: {
      proj: {
        root: 'proj',
        targets: {
          'test-storybook': {
            executor: '@opansauce/storybook-test-runner',
          },
        },
      },
    },
    npmScope: 'test',
  },
  target: {
    executor: '@opansauce/storybook-test-runner',
  },
};

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await executor(options, mockContext);
    expect(output.success).toBe(true);
  });
});
