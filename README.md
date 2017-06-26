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
* `cp .env.example .env` to copy the example .env file and enter your database connection
* Run `npm run setup` or enter the following commands manually:
    * `yarn install` to install all dependencies and typings.
    * Create new database. You will find the name in the .env file.
    * `npm run db:migrate` to create the schema.
    * `npm run db:seed` to insert some test data.
* `npm run serve` to start the application.

### Running the app
After you have installed all dependencies you can run the app.
Enter `npm run serve` to start a local server using `nodemon`, which will watch for any file changes and will restart the sever according to these changes.
The server address will be displayed to you as `http://0.0.0.0:3000`.

## Scripts / Tasks
All script are defined in the package.json file, but the most important ones are listed here.

### Install
* Install all dependencies with `yarn install`

### Linting
* Run code quality analysis using `npm run lint`. This runs tslint.
* There is also a vscode task for this called `lint`.

### Tests
* Run the unit tests using `npm test`.
* Run the black-box tests using `npm run test:black-box` and don't forget to start your application and your [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server).
* There is also a vscode task for this called `test`.

### Running in dev mode
* Run `npm run serve` to start nodemon with ts-node, to serve the app.
* The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it
* Run `npm run build` to generated all JavaScript files from the TypeScript sources. After this step you can deploy the app to any server.
* There is also a vscode task for this called `build`.
* To start the builded app use `npm start`.

### Database
* Run `npm run db:migrate` to migrate schema changes to the database
* Run `npm run db:migrate:rollback` to rollback one migration
* Run `npm run db:seed` to seed sample data into the database
* Run `npm run db:reset` to rollback all migrations and migrate any migration again

### Console
* To run your own created command enter `npm run console <command-name>`.
* This list all your created commands `npm run console:help`.

### Generating Commands
All the templates for the commands are located in `src/console/templates`.

* `npm run console make:resource <file>` - Generates a controller, service, requests, repo, model and a migration with CRUD operations.
* `npm run console make:controller <file>` - Generates a controller.
* `npm run console make:service <file>` - Generates a service.
* `npm run console make:repo <file>` - Generates a repository.
* `npm run console make:model <file>` - Generates a model with the props and configurations.
* `npm run console make:middleware <file>` - Generates a basic middleware.
* `npm run console make:request <file>` - Generates a basic request.
* `npm run console make:listener <file>` - Generates a basic listener.
* `npm run console make:exception <file>` - Generates a basic exception.
* `npm run console update:targets <file>` - Reads all the API files and generate a new `constants/Targets.ts` file out of it.

**Example**
```
$ npm run console make:controller auth/auth
// -> creates `api/controllers/auth/AuthController.ts

$ npm run console make:model user
// -> creates `api/models/User.ts
```

## IoC
Our IoC automatically looks through the `controllers`, `listeners` , `middlewares`, `services`,
`repositories` and `models` folders for files to bind to our IoC - Container, so you have nothing to do.

**However it is very important to keep the naming right, because otherwise our IoC will not find your
created files!!**

## Using the debugger in VS Code
Just set a breakpoint and hit `F5` in your Visual Studio Code.

## API Routes
The route prefix is `/api` by default, but you can change this in the .env file.

| Route       | Description |
| ----------- | ----------- |
| **/info**   | Shows us the name, description and the version of the package.json |
| **/docs**   | This is the Swagger UI with our API documentation |
| **/status** | Shows a small monitor page for the server |

## Project Structure

| Name                          | Description |
| ----------------------------- | ----------- |
| **.vscode/**                  | VSCode tasks, launch configuration and some other settings |
| **dist/**                     | Compiled source files will be placed here |
| **src/**                      | Source files |
| **src/api/controllers/**      | REST API Controllers |
| **src/api/exceptions/**       | Exceptions like 404 NotFound |
| **src/api/listeners/**        | Event listeners |
| **src/api/middlewares/**      | Express Middlewares like populateUser |
| **src/api/models/**           | Bookshelf Models |
| **src/api/repositories/**     | Repository / DB layer |
| **src/api/requests/**         | Request bodys with validations |
| **src/api/services/**         | Service layer |
| **src/api/** swagger.json     | Swagger documentation |
| **src/console/**              | Command line scripts |
| **src/config/**               | Configurations like database or logger |
| **src/constants/**            | Global Constants |
| **src/core/**                 | The core framework |
| **src/database/factories/**   | Model factories to generate database records |
| **src/database/migrations/**  | Migrations scripts to build up the database schema |
| **src/database/seeds/**       | Seed scripts to fake sample data into the database |
| **src/public/**               | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts         | Custom type definitions and files that aren't on DefinitelyTyped |
| **test**                      | Tests |
| **test/black-box/** *.test.ts | Black-Box tests (like e2e) |
| **test/unit/** *.test.ts      | Unit tests |
| .env.example                  | Environment configurations |
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
* [Auth0 API Documentation](https://auth0.com/docs/api/management/v2)
* [swagger Documentation](http://swagger.io/)

## License
 [MIT](/LICENSE)

---
Made with ♥ by Gery Hirschfeld ([@GeryHirschfeld1](https://twitter.com/GeryHirschfeld1)) and [contributors](https://github.com/w3tecch/express-typescript-boilerplate/graphs/contributors)
