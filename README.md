
# City Data

## Requirements
- npm

## Installations
- npm install

## Development
- NODE_ENV=development npm start
- Open the server at http://localhost:8080/

## Testing

Karma & Jest unit and (Jest) integration test

```
NODE_ENV=development npm test
```

Only Karma unit tests

```
NODE_ENV=development npm run test-karma
```

Only Jest unit tests

```
NODE_ENV=development npm run test-jest
```

Integration tests

```
NODE_ENV=development npm run test-integration
```

### E2E testing

End to end test can either run against a local server or through docker-compose.

In order to test authentication the following environment variables must be set:

- `PASSWORD_EMPLOYEE`
- `PASSWORD_EMPLOYEE_PLUS`
- `USERNAME_EMPLOYEE`
- `USERNAME_EMPLOYEE_PLUS`

They can simply be added by using the `export` command from the command line, or by adding these
variables to `.bash_profile`.

### E2E Functional testing

Make sure the app is running locally by running `npm start`.
Then, in a second terminal, run `npm run test-e2e-functional` (single run).
Or open the UI using `npm run test-e2e-functional-watch`.

Test using docker-compose:
```
docker-compose up --build test-e2e-functional
```

To test against production APIs you can use the same tasks, suffixed with `prod`:

- Make sure the app is running locally by running `npm run start-prod`.
- Then, in a second terminal, run `npm run test-e2e-functional-prod` (single run).
- Or open the UI using `npm run test-e2e-functional-prod-watch`.

### E2E Aria testing

Make sure the app is running locally.
Then run `npm run test-aria`.

Test using docker-compose:
```
docker-compose up --build test-e2e-aria
```

### E2E Visual testing

_Currently not working in CI_

`docker-compose up --build test-e2e-visual`


## Other useful commands

- `npm run clean`
- `npm run test-lint`

## Techniques used
- AngularJS
- React
- Redux
- Leaflet
- D3

## Conventions used
- John Papa Angular style guide (https://github.com/johnpapa/angular-styleguide/tree/master/a1)
- EditorConfig (http://editorconfig.org/)
- BEM (http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
- BEMIT (http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
- BEM namespaces (http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) without tags and a release branch

