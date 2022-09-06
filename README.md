# Developer Documentation

Please refer to the "Quick Guide" section of this README file for every necessary information to run the code and tests.

Please note that in case of a real application, the (TMDB) API key should be moved to server-side code.

## Quick Guide:

**Setup:**

Create a `.env.local` file inside the root folder (next to `package.json`) and paste `REACT_APP_TMDB_API_KEY={MY_API_KEY}` into it, using your TMDB API key.

`yarn install` - install dependencies

**Start (+ build):**

`yarn start` - start development version locally

`yarn build` - generate build

`yarn start-prod` - generate build and start production version locally

**Testing:**

`yarn test` - run all unit tests and UI Component tests (Jest + Jest-DOM)

`yarn test {fileName}` - run a specific test file, e.g. `utils.test.ts` with `yarn test utils` (or `Header.test.tsx` with `yarn test Header`)

`yarn test-cov` - run unit tests (Jest) and generate coverage report

`yarn e2e` - run end-to-end tests (Cypress), launching an Electron app or a browser (optionally add `-chrome`, `-firefox`, or `-edge` to the end of the command)

`yarn e2e-headless` - run end-to-end tests (Cypress) in a headless browser

`yarn cypress` - open the Cypress app for greater control over the test execution (e.g. time traveling)

**Security - check for vulnerabilities in dependencies:**

`yarn audit` - scan dependencies for known security issues and vulnerabilities

`yarn snyk` - run Snyk to scan dependencies for known security issues and vulnerabilities. The initial setup requires Synk to be installed globally (`yarn global add snyk`), plus authentication (after installing Snyk, type `snyk` for more info).

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

## Useful links:

-   https://www.themoviedb.org/
-   https://www.themoviedb.org/about/logos-attribution
-   https://developers.themoviedb.org/3/getting-started/introduction
-   https://www.reshot.com/free-svg-icons
-   https://react-icons.github.io/react-icons/
