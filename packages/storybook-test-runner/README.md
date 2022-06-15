# @opansauce/storybook-test-runner

[![License](https://img.shields.io/npm/l/@opansauce/storybook-test-runner.svg?style=flat-square)]()
[![NPM Version](https://badge.fury.io/js/%40opansauce%2Fstorybook-test-runner.svg)](https://www.npmjs.com/@opansauce/storybook-test-runner)

This NX plugin provides basic support for [the new Storybook feature: interaction testing](https://storybook.js.org/docs/angular/writing-tests/interaction-testing). For now it provides a basic generator to add a new 'e2e' target for your UI libraries. Writing a Play function and running interaction tests in CI will make sure your stories won't become stale and break at runtime.

## Getting started

### How to use

`nx g @opansauce/storybook-test-runner:init my-ui-library`

This gives you an additional **e2e** run target for your project. Use the new target(s) by running:

`nx run my-ui-library:e2e`

When already having the target `my-ui-library:storybook` running use:

`nx run my-ui-library:test-storybook`

### Gotcha

When ran in parallel (in CI), the storybook instances need to use a unique port. By default the generator generates it with port 4400, so you have to change it yourself if you have more than one project.

### Prerequisites

- You're using Angular
- You're using Storybook by using the `@nrwl/angular` plugin
- You're using Storybook 6.5.x or higher
- You've setup the interaction testing addon [as described here](https://storybook.js.org/docs/angular/writing-tests/interaction-testing#set-up-the-interactions-addon)
- You've written a Play function for a story [as described here](https://storybook.js.org/docs/angular/writing-tests/interaction-testing#write-an-interaction-test)

## Roadmap

- [ ] add executor and get rid of `wait-on` and `concurrently` dependencies
- [ ] check for Storybook version in init generator
- [ ] add main.js/ts configuration in init generator
- [ ] add support for other frameworks than Angular

## Contributing

### Building

Run `nx build storybook-test-runner` to build the library.

### Running unit tests

Run `nx test storybook-test-runner` to execute the unit tests via [Jest](https://jestjs.io).

### Running e2e

Run `nx e2e storybook-test-runner-e2e` to execute e2e tests.

### Publishing

[Follow the directions described here](https://nx.dev/packages/nx-plugin#publishing-your-nx-plugin)
