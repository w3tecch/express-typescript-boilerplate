# Express Typescript Boilerplate

[![Dependency Status](https://david-dm.org/w3tecch/express-typescript-boilerplate/status.svg?style=flat)](https://david-dm.org/w3tecch/express-typescript-boilerplate)
[![Build Status](https://travis-ci.org/w3tecch/express-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-typescript-boilerplate)
[![Build status](https://ci.appveyor.com/api/projects/status/f8e7jdm8v58hcwpq/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing)](https://ci.appveyor.com/project/dweber019/express-typescript-boilerplate/branch/master)

> A delightful way to building a RESTful API with NodeJs & TypeScript.
> An Node.js Web-Serice boilerplate/skeleton/starter-kit featuring
[TypeScript](https://www.typescriptlang.org/),
[Express](https://expressjs.com/),
[Winston](https://github.com/winstonjs/winston),
[Microframework](https://github.com/pleerock/microframework),
[TypeDI](https://github.com/pleerock/typedi),
[TypeORM](https://github.com/typeorm/typeorm),
[TsLint](http://palantir.github.io/tslint/),
[@types](https://www.npmjs.com/~types),
[Jest](https://facebook.github.io/jest/),
[Swagger](http://swagger.io/),
[validatejs](https://validatejs.org/),
by [w3tech](https://github.com/w3tecch)

## Why

Our main goal with this project is a feature complete server application.
We like you to be focused on your business and not spending hours in project configuration.

Try it!! We are happy to hear your feedback or any kind of new features.

## Features

- **Beautiful Code** thanks to the awesome annotations of the libraries from [pleerock](https://github.com/pleerock).
- **Easy API Testing** with included e2e testing.
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [TypeOrm](https://github.com/typeorm/typeorm).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/pleerock/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **Custom Validators** to validate your request even better and stricter. [custom-validation-classes](https://github.com/pleerock/class-validator#custom-validation-classes)
- **API Documentation** thanks to [swagger](http://swagger.io/).
- **API Monitoring** thanks to [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).
- **Integrated Testing Tool** thanks to [Wallaby.js](https://wallabyjs.com/)
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/)

### Comming soon

- **Fast Database Building** with simple migration and seeding from [Knex](http://knexjs.org/).
- **Easy Data Seeding** with our own factories.
- **Custom Commands** are also available in our setup and really easy to use or even extend.
- **Scaffolding Commands** will speed up your development tremendously as you should focus on business code and not scaffolding.

## Getting Started

### Step 1:  Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
npm install yarn -g
```

Install a MySQL database.

> If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
nps setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
nps serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the sever according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

## Scripts / Tasks

All script are defined in the package.json file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `nps lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `nps test` (There is also a vscode task for this called `test`).
- Run the e2e tests using `nps test:e2e` and don't forget to start your application and your [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server).

### Running in dev mode

- Run `nps serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `nps build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `npm start`.

## Using the debugger in VS Code

Just set a breakpoint and hit `F5` in your Visual Studio Code.

## API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route        | Description |
| ------------ | ----------- |
| **/api**     | Shows us the name, description and the version of the package.json |
| **/swagger** | This is the Swagger UI with our API documentation |
| **/monitor** | Shows a small monitor page for the server |

## Project Structure

| Name                          | Description |
| ----------------------------- | ----------- |
| **.vscode/**                  | VSCode tasks, launch configuration and some other settings |
| **dist/**                     | Compiled source files will be placed here |
| **src/**                      | Source files |
| **src/api/controllers/**      | REST API Controllers |
| **src/api/errors/**           | Custom HttpErrors like 404 NotFound |
| **src/api/interceptors/**     | Interceptors are used to change or replace the data returned to the client. |
| **src/api/middlewares/**      | Express Middlewares like helmet security features |
| **src/api/models/**           | Bookshelf Models |
| **src/api/repositories/**     | Repository / DB layer |
| **src/api/services/**         | Service layer |
| **src/api/validators/**       | Custom validators, which can be used in the request classes |
| **src/api/** swagger.json     | Swagger documentation |
| **src/console/**              | Command line scripts |
| **src/constants/**            | Global Constants |
| **src/core/**                 | The core features like logger and env variables |
| **src/public/**               | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts         | Custom type definitions and files that aren't on DefinitelyTyped |
| **test**                      | Tests |
| **test/e2e/** *.test.ts       | End-2-End tests (like e2e) |
| **test/unit/** *.test.ts      | Unit tests |
| .env.example                  | Environment configurations |

## Related Projects

- [Microsoft/TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) - A starter template for TypeScript and Node with a detailed README describing how to use the two together.
- [express-graphql-typescript-boilerplate](https://github.com/w3tecch/express-graphql-typescript-boilerplate) - A starter kit for building amazing GraphQL API's with TypeScript and express by @w3tecch
- [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript
- [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server) - Useful for e2e testing or faking an oAuth server

## Documentations of our main dependencies

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Microframework](https://github.com/pleerock/microframework) | Microframework is a simple tool that allows you to execute your modules in a proper order, helping you to organize bootstrap code in your application. |
| [TypeDI](https://github.com/pleerock/typedi) | Dependency Injection for TypeScript. |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [TypeORM](http://typeorm.io/#/) | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework. |
| [class-validator](https://github.com/pleerock/class-validator) | Validation made easy using TypeScript decorators. |
| [class-transformer](https://github.com/pleerock/class-transformer) | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors |
| [event-dispatcher](https://github.com/pleerock/event-dispatch) | Dispatching and listening for application events in Typescript |
| [Helmet](https://helmetjs.github.io/) | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! |
| [Auth0 API Documentation](https://auth0.com/docs/api/management/v2) | Authentification service |
| [Jest](http://facebook.github.io/jest/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |

## License

[MIT](/LICENSE)

---
Made with ♥ by w3tech ([w3tech](https://github.com/w3tecch)), Gery Hirschfeld ([@GeryHirschfeld1](https://twitter.com/GeryHirschfeld1)) and [contributors](https://github.com/w3tecch/express-typescript-boilerplate/graphs/contributors)