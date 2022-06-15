import {
  checkFilesExist,
  ensureNxProject,
  readFile,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('storybook-test-runner e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject(
      '@opansauce/storybook-test-runner',
      'dist/packages/storybook-test-runner'
    );
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    runNxCommandAsync('reset');
  });

  it('should create new configuration', async () => {
    const project = uniq('storybook-test-runner');
    await runNxCommandAsync(`generate @nrwl/angular:library ${project}`);
    await runNxCommandAsync(
      `generate @nrwl/angular:storybook-configuration ${project} --configureCypress false`
    );
    await runNxCommandAsync(
      `generate @opansauce/storybook-test-runner:init ${project}`
    );
    expect(() => checkFilesExist(`libs/${project}/project.json`)).not.toThrow();
    const file = readFile(`libs/${project}/project.json`);
    const parsedFile = JSON.parse(file);
    expect(parsedFile.targets['test-storybook']).toBeDefined();
    expect(parsedFile.targets['e2e']).toBeDefined();

    const packageJson = readFile('package.json');
    const parsedPackageJson = JSON.parse(packageJson);
    const keys = Object.keys(parsedPackageJson.devDependencies);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain('@storybook/addon-interactions');
    expect(keys).toContain('@storybook/jest');
    expect(keys).toContain('@storybook/test-runner');
    expect(keys).toContain('@storybook/testing-library');
    expect(keys).toContain('concurrently');
    expect(keys).toContain('wait-on');
  }, 300000);
});
