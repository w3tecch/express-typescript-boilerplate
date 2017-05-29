# Express Typescript Boilerplate
[![Dependency Status](https://david-dm.org/w3tecch/express-typescript-boilerplate/status.svg?style=flat)](https://david-dm.org/w3tecch/express-typescript-boilerplate) [![Build Status](https://travis-ci.org/w3tecch/express-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-typescript-boilerplate)

A delightful way to building a RESTful API with NodeJs & TypeScript.
- **Beautiful Syntax** thanks to the awesome annotations from [Inversify Express Utils](https://github.com/inversify/inversify-express-utils).
- **Easy API Testing** with included black-box testing.
- **Dependency Injection** done with the nice framework from [Inversify](http://inversify.io/).
- **Fast Database Building** with simple migration and seeding from [Knex](http://knexjs.org/).
- **Simplified Database Query** with the ORM of [Knex](http://knexjs.org/) called [Bookshelf](http://bookshelfjs.org/).
- **Clear Structure** with controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** with our own simple classes. You will see.
- **Easy Data Seeding** with our own factories.
- **Custom Commands** are also available in our setup and really easy to use.
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **API Documentation** thanks to [swagger](http://swagger.io/).
- **API Monitoring** thanks to [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).
- **Integrated Testing Tool** thanks to [Wallaby.js](https://wallabyjs.com/)

## Getting Started
### Prerequisites
* Install [Node.js](http://nodejs.org)
    * on OSX use [homebrew](http://brew.sh) `brew install node`
    * on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`
* Install yarn globally `npm install yarn -g`

### Installing
* `fork` this repo
* `clone` your fork
* `yarn install` to install all dependencies and typings
* Create new database. You will find the name in the .env files.
* `npm run db:migrate` to create the schema
* `npm run db:seed` to insert some test data
* `npm run serve` to start the dev server in another tab

### Running the app
After you have installed all dependencies you can now run the app.
Run `npm run serve` to start a local server using `nodemon` which will watch for changes and then will restart the sever.
The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

## Scripts / Tasks
All script are defined in the package.json file, but the most important ones are listed here.

### Install
* Install all dependencies with `yarn install`

### Linting
* Run code analysis using `npm run lint`. This runs tslint.
* There is also a vscode task for this called lint.

### Tests
* Run the unit tests using `npm test`.
* Run the black-box tests using `npm run test:black-box` and don't forget to start your application and your [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server).
* There is also a vscode task for this called test.

### Running in dev mode
* Run `npm run serve` to start nodemon with ts-node, which will serve your app.
* The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it
* Run `npm run build` to generated all JavaScript files from your TypeScript sources. After this step you can deploy the app on any server.
* There is also a vscode task for this called build.
* To start the builded app use `npm start`.

### Database
* Run `npm run db:migrate` to migration the new schema to the database
* Run `npm run db:migrate:rollback` to rollback one version
* Run `npm run db:seed` to seed some data into the database
* Run `npm run db:reset` to clean the database and migrate again

### Console
* To run your own created cli script enter `npm run console <command-name>`

## Using the debugger in VS Code
Just set a breakpoint and hit `F5` in your Visual Studio Code.

## API Routes
The route prefix is by default `/api/v1`, but you can change this in the .env.example file.

| Route       | Description |
| ----------- | ----------- |
| **/info**   | Shows us the name, description and the version of the package.json |
| **/docs**   | This is the Swagger UI with our API Documentation |
| **/status** | Shows a small monitor app for our API |

## Project Structure

| Name                          | Description |
| ----------------------------- | ----------- |
| **.vscode/**                  | VSCode tasks, launch configuration and some other settings |
| **build/**                    | Task Runner configurations and tasks |
| **dist/**                     | Compiled source files will be placed here |
| **src/**                      | Source-Files |
| **src/api/controllers/**      | REST-API - Controllers |
| **src/api/exceptions/**       | Exceptions like 404 NotFound |
| **src/api/middlewares/**      | Express Middlewares like populateUser |
| **src/api/models/**           | Bookshelf Models |
| **src/api/repositories/**     | Repository Layer |
| **src/api/requests/**         | Request Bodys with Validations |
| **src/api/services/**         | Service Layer |
| **src/api/** swagger.json     | Swagger Documentation |
| **src/console/**              | Command Line scripts |
| **src/constants/**            | Global Constants |
| **src/core/**                 | All the libraries configurations and our small framework |
| **src/database/factories/**   | Model Factories to generate database records |
| **src/database/migrations/**  | Migrations scripts to build up our database schema |
| **src/database/seeds/**       | Seed scripts to fake some data into our database |
| **src/public/**               | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts         | Custom Type Definitions and files that aren't on DefinitelyTyped |
| **test**                      | All our test cases |
| **test/setup/**               | Some setup scripts to create a needed test environment |
| **test/black-box/** *.test.ts | Black-Box Testing (like e2e) |
| **test/unit/** *.test.t       | Unit Testing |
| .env.example                  | All environment configurations |
| knexfile.ts                   | This file is used for the migrations and seed task of knex |

## Related Projects
* [Microsoft/TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) - A starter template for TypeScript and Node with a detailed README describing how to use the two together.
* [express-graphql-typescript-boilerplate](https://github.com/w3tecch/express-graphql-typescript-boilerplate) - A starter kit for building amazing GraphQL API's with TypeScript and express by @w3tecch
* [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript
* [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server)

## Documentations
* [Express](https://expressjs.com/)
* [Knex](http://knexjs.org/)
* [Bookshelf](http://bookshelfjs.org/)
* [Bookshelf Cheatsheet](http://ricostacruz.com/cheatsheets/bookshelf.html)
* [Inversify](http://inversify.io/)
* [Inversify Express Utils](https://github.com/inversify/inversify-express-utils)
* [class-validator](https://github.com/pleerock/class-validator)
* [Jest](http://facebook.github.io/jest/)
* [Auth0 API Documentation](https://auth0.com/docs/api/management/v2#!/Users/get_users)
* [swagger Documentation](http://swagger.io/)

## License
 [MIT](/LICENSE)

---
Made with ♥ by Gery Hirschfeld ([@GeryHirschfeld1](https://twitter.com/GeryHirschfeld1)) and [contributors](https://github.com/w3tecch/express-typescript-boilerplate/graphs/contributors)
