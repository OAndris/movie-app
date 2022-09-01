# Developer Documentation

Please refer to the "Quick Guide" section of this README file for every necessary information to run the code and tests.

## Quick Guide:

**Setup & Security:**

`yarn install` - install dependencies

`yarn audit` - scan dependencies for known security issues and vulnerabilities

`yarn snyk` - run Snyk to scan dependencies for known security issues and vulnerabilities (initial setup requires synk to be installed globally, plus authentication)

**Start:**

`yarn start` - start development version locally

`yarn serve` - generate production build and start it locally

**Build:**

`yarn build` - generate production build

**Testing:**

`yarn test` - run all unit tests and UI Component tests (Jest + Jest-DOM)

`yarn test {fileName}` - run a specific test file, e.g. `utils.test.ts` with `yarn test utils` (or `App.test.tsx` with `yarn test App.test`)

`yarn test-coverage` - run unit tests (Jest) and generate coverage report

`yarn e2e` - run E2E tests (Cypress)

**Deployment:**

The `main` branch is being monitored and deployed automatically on Netlify.

## Application Description:

The task is to create a simple Typescript React UI that has an input box. Upon pressing a button, it queries movies using the value of the input, through an external api and displays the results in a list.

The recommended api is "The Movie Database" (https://developers.themoviedb.org/3/search/search-movies - registration required).

If you encounter any issues querying that api, any json or graphql one with similar functionalities can be used.

Notable checkpoints:

-   Testing (any framework, any level)
-   Loading spinner
-   Search is automatically triggered after at least 3 characters entered
-   Search by pressing ENTER
-   Caching
-   Pagination, limits
-   Adding movies to favorites, stored locally, refreshing automatically
-   Displaying favorites in the list and on a different part of the screen (eg right side or top)
