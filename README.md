# Express Typescript Boilerplate

[![Dependency Status](https://david-dm.org/w3tecch/express-typescript-boilerplate/status.svg?style=flat)](https://david-dm.org/w3tecch/express-typescript-boilerplate)
[![Build Status](https://travis-ci.org/w3tecch/express-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-typescript-boilerplate)
[![Build status](https://ci.appveyor.com/api/projects/status/f8e7jdm8v58hcwpq/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing)](https://ci.appveyor.com/project/dweber019/express-typescript-boilerplate/branch/master)

> A delightful way to building a RESTful API Services with beautiful code written in TypeScript.
> An Node.js Web-Service boilerplate/skeleton/starter-kit featuring
> Inspired by the awesome framework [laravel](https://laravel.com/) in PHP and of the repositories from [pleerock](https://github.com/pleerock).
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
[GraphQL](http://graphql.org/),
[DataLoaders](https://github.com/facebook/dataloader),
by [w3tech](https://github.com/w3tecch)

## Why

Our main goal with this project is a feature complete server application.
We like you to be focused on your business and not spending hours in project configuration.

Try it!! We are happy to hear your feedback or any kind of new features.

## Features

- **Beautiful Code** thanks to the awesome annotations of the libraries from [pleerock](https://github.com/pleerock).
- **Easy API Testing** with included e2e testing.
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/pleerock/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **Custom Validators** to validate your request even better and stricter. [custom-validation-classes](https://github.com/pleerock/class-validator#custom-validation-classes).
- **API Documentation** thanks to [swagger](http://swagger.io/).
- **API Monitoring** thanks to [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).
- **Integrated Testing Tool** thanks to [Jest](https://facebook.github.io/jest).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **Easy event dispatching** thanks to [event-dispatch](https://github.com/pleerock/event-dispatch).
- **Fast Database Building** with simple migration from [TypeORM](https://github.com/typeorm/typeorm).
- **Easy Data Seeding** with our own factories.
- **GraphQL** provides as a awesome query language for our api [GraphQL](http://graphql.org/).
- **DataLoaders** helps with performance thanks to caching and batching [DataLoaders](https://github.com/facebook/dataloader).

### Comming soon

- **Custom Commands** are also available in our setup and really easy to use or even extend.
- **Scaffolding Commands** will speed up your development tremendously as you should focus on business code and not scaffolding.

# Table of Contents

- [Getting Started](#getting-started)
- [Scripts and Tasks](#scripts-and-tasks)
- [Debugger in VSCode](#debugger-in-vscode)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Logging](#logging)
- [Event Dispatching](#event-dispatching)
- [Seeding](#seeding)
- [Further Documentations](#further-documentation)
- [Related Projects](#related-projects)
- [License](#license)

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
npm start setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
npm start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the sever according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

## Scripts and Tasks

All script are defined in the package.json file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `npm start lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `npm start test` (There is also a vscode task for this called `test`).
- Run the integration tests using `npm start test:integration`.
- Run the e2e tests using `npm start test:e2e` and don't forget to start your application and your [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server).

### Running in dev mode

- Run `npm start serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `npm start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `npm start`.

### Database Migration

- Run `typeorm migrations:create -n <migration-file-name>` to create a new migration file.
- Try `typeorm -h` to see more useful cli commands like generating migration out of your models.
- To migrate your database run `npm start db.migrate`.
- To revert your latest migration run `npm start db.revert`.
- Drops the complete database schema `npm start db.drop`.

### Database Seeding

- Run `npm start db.seed` to seed your seeds into the database.

## Debugger in VSCode

To debug your code run `npm start build` or hit `cmd + b` to build your app.
Then, just set a breakpoint and hit `F5` in your Visual Studio Code.

## API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api**       | Shows us the name, description and the version of the package.json |
| **/graphql**   | Route to the graphql editor or your query/mutations requests |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/monitor**   | Shows a small monitor page for the server |
| **/api/users** | Example entity endpoint |
| **/api/pets**  | Example entity endpoint |

## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/controllers/requests**  | Request classes with validation rules if the body is not equal with a model |
| **src/api/controllers/responses** | Response classes or interfaces to type json response bodies  |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/api/middlewares/**          | Express Middlewares like helmet security features |
| **src/api/models/**               | Bookshelf Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/validators/**           | Custom validators, which can be used in the request classes |
| **src/api/queries/**              | GraphQL queries |
| **src/api/mutations/**            | GraphQL mutations |
| **src/api/types/**                | GraphQL types |
| **src/api/** swagger.json         | Swagger documentation |
| **src/auth/**                     | Authentication checkers and services |
| **src/core/**                     | The core features like logger and env variables |
| **src/database/factories**        | Factory the generate fake entities |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @Logger & @EventDispatch |
| **src/loaders/**                  | Loader is a place where you can configure your app |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts             | Custom type definitions and files that aren't on DefinitelyTyped |
| **test**                          | Tests |
| **test/e2e/** *.test.ts           | End-2-End tests (like e2e) |
| **test/integration/** *.test.ts   | Integration test with SQLite3 |
| **test/unit/** *.test.ts          | Unit tests |
| .env.example                      | Environment configurations |
| .env.test                         | Test environment configurations |
| ormconfig.json                    | TypeORM configuration for the database. Used by seeds and the migration. (generated file) |
| mydb.sql                          | SQLite database for integration tests. Ignored by git and only available after integration tests |

## Logging

Our logger is [winston](https://github.com/winstonjs/winston). To log http request we use the express middleware [morgan](https://github.com/expressjs/morgan).
We created a simple annotation to inject the logger in your service (see example below).

```typescript
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    ...
```

## Event Dispatching

Our we use this awesome repository [event-dispatch](https://github.com/pleerock/event-dispatch) for event dispatching.
We created a simple annotation to inject the EventDispatcher in your service (see example below). All events are listed in the `events.ts` file.

```typescript
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';

@Service()
export class UserService {

    constructor(
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) { }

    public async create(user: User): Promise<User> {
        ...
        this.eventDispatcher.dispatch(events.user.created, newUser);
        ...
    }
```

## Seeding

Isn't exhausting to create some sample data into your fresh migrated database, well this time is over!
How does it work? Just, create a factory for your entities and a seeds script.

### 1. Create a factory for your entity

For all the entities we want to seed, we need to define a factory. To do so we give you the awesome [faker](https://github.com/marak/Faker.js/) library as a parameter into your factory. Then create your "fake" entity as you would normally do and return it. Those factory files should be in the `src/database/factories` folder and suffixed with `Factory`. Example `src/database/factories/UserFactory.ts`.

```typescript
factory.define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    return user;
});
```

This can be used to pass some dynamic value into the factory.

```typescript
factory.define(Pet, (faker: typeof Faker, args: any[]) => {
    const type = args[0];
    return {
        name: faker.name.firstName(),
        type: type || 'dog'
    };
});
```

To deal with relations you can use the entity manager like this.

```typescript
import { SeedsInterface, FactoryInterface, times } from '../../lib/seeds';
import { Pet } from '../../../src/api/models/Pet';
import { User } from '../../../src/api/models/User';

export class CreatePets implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        await times(10, async (n) => {
            // This creates a pet in the database
            const pet = await factory.get(Pet).create();
            // This only returns a entity with fake data
            const user = await factory.get(User).make();
            user.pets = [pet];
            await em.save(user);
        });
    }

}
```

### 2. Create a seed file

The seeds files define how much and how the data are connected with each other. The files will be executed alphabetically.

```typescript
export class CreateUsers implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        await factory
            .get(User)
            .create(10);
    }

}
```

With the second parameter in the `.get(<Entity>, <args>)` you are able to create different variations of entities.

```typescript
export class CreateUsers implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        await factory
            .get(User, 'admin')
            .create(1);
    }

}
```

Here an example with nested factories.

```typescript
...
await factory.get(User)
    .each(async (user: User) => {

        const pets: Pet[] = await factory.get(Pet)
            .create(2);

        const petIds = pets.map((pet: Pet) => pet.Id);
        await user.pets().attach(petIds);

    })
    .create(5);
...
```

### 3. Run the seeder

The last step is the easiest, just hit the following command in your terminal, but be sure you are in the projects root folder.

```bash
npm start db.seed
```

## Further Documentations

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
| [SQLite Documentation](https://www.sitepoint.com/getting-started-sqlite3-basic-commands/) | Getting Started with SQLite3 – Basic Commands. |
| [GraphQL Documentation](http://graphql.org/graphql-js/) | A query language for your API. |
| [DataLoader Documentation](https://github.com/facebook/dataloader) | DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching. |

## Related Projects

- [Microsoft/TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) - A starter template for TypeScript and Node with a detailed README describing how to use the two together.
- [express-graphql-typescript-boilerplate](https://github.com/w3tecch/express-graphql-typescript-boilerplate) - A starter kit for building amazing GraphQL API's with TypeScript and express by @w3tecch
- [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript
- [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server) - Useful for e2e testing or faking an oAuth server

## License

[MIT](/LICENSE)

---
Made with ♥ by w3tech ([w3tech](https://github.com/w3tecch)), Gery Hirschfeld ([@GeryHirschfeld1](https://twitter.com/GeryHirschfeld1)) and [contributors](https://github.com/w3tecch/express-typescript-boilerplate/graphs/contributors)