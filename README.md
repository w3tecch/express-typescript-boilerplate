# Express Typescript Boilerplate

> Boilerplate for an restful express-apllication written in TypeScript

## Getting Started
### Prerequisites
* Install [Node.js](http://nodejs.org)
    * on OSX use [homebrew](http://brew.sh) `brew install node`
    * on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`
* Install yarn globally `npm install yarn -g`

## Installing
* `fork` this repo
* `clone` your fork
* `install:dev` to install all dependencies and typings
* Create new database. You will find the name in the `src/config.ts` file.
* `npm run db:migrate` to create the schema
* `npm run db:seed` to insert some test data
* `npm run serve` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app.
Run `npm run serve` to start a local server using `nodemon` which will watch for changes and then will restart the sever.
The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

## Scripts / Commands
### Install
* Install all dependencies with `yarn install`
* Install all typings with `npm run install:typings`
* To install all dependencies and typings use `npm run install:dev`
* Remove not needed libraries with `npm run install:clean`

### Linting
* Run code analysis using `npm run lint`. This runs tshint.
* There is also a vscode task for this called lint.

### Tests
* Run the unit tests using `npm test`.
* There is also a vscode task for this called test.

### Running in dev mode
* Run `npm run serve` to start nodemon with ts-node, which will serve your app.
* The server address will be displayed to you as `http://0.0.0.0:3000`

### Cleaning the project
* Run `npm run clean` to remove all generated JavaScript files.
* Run `npm run db:clean` to drop all tables of the database.

### Building the project and run it
* Run `npm run build` to generated all JavaScript files from your TypeScript sources. After this step you can deploy the app on any server.
* There is also a vscode task for this called build.
* To start the builded app use `npm start`.
* With `npm run zip` it will generate the JavaScript source and pack them into to a deployable zip file into the dist folder.

### Docs
* Run `npm run docs` to generate all doc files and serve it on `http://0.0.0.0:8080`

### Seed
* Run `npm run db:seed` to seed some data into the database

### Migration
* Run `npm run db:migrate` to migration the new schema to the database
* Run `npm run db:migrate:rollback` to rollback one version


## Related Projects
* [express-graphql-typescript-boilerplate](https://github.com/w3tecch/express-graphql-typescript-boilerplate) - A starter kit for building amazing GraphQL API's with TypeScript and express by @w3tecch
* [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript

## License
MIT

## Documentations
* [Auth0 API Documentation](https://auth0.com/docs/api/management/v2#!/Users/get_users)
* [Bookshelf Cheatsheet](http://ricostacruz.com/cheatsheets/bookshelf.html)

---
Made with ♥ by Gery Hirschfeld ([@GeryHirschfeld1](https://twitter.com/GeryHirschfeld1))
