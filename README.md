# Motivation

My main mission behind this repo is to show you my ability to work with this
kind of technology and how I organize the project and code. The repo supports
basic functionality like GRUD operations, authentication (JWT/cookies), grouping
users by rules, protecting the endpoints, and others.

This repo is a second part (BE) of the [E-commerce web app](https://github.com/DeanHristov/fake-e-commerce-web-app).

**I haven't used any kind of AI tools like ChatGPT, CoPIlot, or any other "
crutches" for the mind.**

## The API comes with the following functionality

- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution (hpp)
- Add headers for security (helmet)
- Use cors to make API public
- Data pagination

### Users, Carts, Products and Authentication

- Authentication is done by using:
  - JWT for authentication
  - JWT or cookie expires in 10 minutes - By default
  - Possibility to store the token in cookie - Optional
  - Reading/validating the token from "Authentication" header - By default
  - Reading/validating the token from a cookie - Optional
  - Invalidating of the JWT - Putting it on blacklist until it expires \*
    \*Coming soon!\*\*
- Sign In/Out:
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx) and
    in response body as well
  - Invalidating of the JWT on sign-out - **Coming soon!**
  - Removing the cookie
- Users:
  - All users are stored in collection (MongoDB like datastore)
  - Only the admin has full access to CRUD operations over a any user.
  - Passwords is hashed before store it in the collection
  - Changing a user password - Owner or Admin
  - Mutating a user's data - The owner (user) or admin
  - Creating/Deleting a user - Only admin has this ability
  - Password reset - **Coming soon!**
  - Verifying user creation (by email) - **Coming soon!**
  - All CRUD operations above require an authentication
  - Some of the CRUD operations above require authorization (with an admin
    role)
- Carts:
  - All carts are stored in collection (MongoDB like datastore)
  - Mutating the cart data - The owner (user) or admin
  - Creating/Deleting a cart - Only admin has this ability
  - Only the admin has full access to CRUD operations over any cart.
  - All CRUD operations above require an authentication
  - Some of the CRUD operations above require authorization (with an admin
    role)
- Products:
  - All products are stored in collection (MongoDB like datastore)
  - Fetching a list of products **`GET /api/v1/products`** - Do not require
    authentication/authorization
  - Fetching a single product **`GET /api/v1/products/:productId`** - Do not
    require authentication/authorization
  - Mutating the product data - Only admin has this ability
  - Creating/Deleting a product - Only admin has this ability
  - Some of the operations above require an authentication
  - Some of the CRUD operations above require authorization (with an admin
    role)

Currently, there are three kinds of users. Each of them has different abilities

| #   | email                 | pass   | Role    | effects             |
| --- | --------------------- | ------ | ------- | ------------------- |
| 1   | admin@my-site.com     | 12345  | admin   | Super user          |
| 2   | visitor@my-site.com   | 13579  | visitor | Mutate its own data |
| 3   | visitor-1@my-site.com | 024680 | visitor | Mutate its own data |

## Project Structure

The project structure presented in this boilerplate is **flatten**, where
functionality is grouped primarily by feature rather than the file type.

```

├── build                           # Auto-generated directory. Contains **production-ready** code.
│   └── *.js
│   └── [dir-name]                  # Sub directory
│       └── *.js
├── docs                            # Storing the postman collections
│   └── *.json                      # Represent a single collection
├── src                             # Application source code is stored here.
│   ├── controllers                 # A directory contains files that control the behavior of the routes.
│       └── *.ts                    # Controlling how the user interacts with a route.
│   ├── core                        # The core functionality is stored here.
│       └── *.ts                    # Usually, represent models.
│   ├── middlewares                 # A directory that contains files with expressjs-based middlewares.
│       └── *.ts                    # Each file contains a single middleware.
│   ├── routes                      # Contains files that represent endpoints (URIs) and respond to client requests.
│       └── *.ts                    # Represent a single endpoint.
│   ├── utils                       # A directory that contains utility files.
│       └── *.ts                    # A utility file - Common used functionality.
│   ├── mocks                       # A directory that could contain fake-data. It is used only for seeding the data.
│       └── *.json                  # A single unit, that contains fake data.
│   ├── App.ts                      # The entry point of the app.
├── .env                            # App-related ENV variables are stored here. MUST be created manually!
├── .env.example                    # A template which contains important variables for the app.
├── .eslintignore                   # Config file for ESLint
├── .eslintrc                       # Config file for ESLint
├── .gitignore                      # Config file for GIT
├── .prettierrc                     # Config file for Prettier
├── jest.config.ts                  # Config file for Jestjs
├── nodemon.json                    # Config file for nodemon
├── package.json                    # The heart of the app. It holds important metadata about a project like scripts dependencies
├── package-lock.json               # Place where we control the dependencies
├── README.md                       # A documentation file
├── tsconfig.json                   # Config file for typescript
```

## Main tasks

All tasks automation are based
on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                     | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| `npm run start:dev`       | Running the app in **dev** mode                       |
| `npm run build`           | Building the code in **production-ready** mode        |
| `npm run start`           | Running the app in **prod** mode                      |
| `npm run test`            | Running the unit tests ( using jest)                  |
| `npm run test:dev`        | Running the unit with `--watchAll` mode ( using jest) |
| `npm run prettier-format` | Code formatting                                       |

## Requirements

- [Node](https://nodejs.org/en/) `^16.15.0`
- [NPM](https://www.npmjs.com/) `^8.5.5`

## Installation

After confirming that your environment meets the
above [requirements](#requirements), it is time to clone the project
locally by doing the following:

```bash
$ git clone git@github.com:DeanHristov/fake-api-e-commerce.git <project-name>
$ cd <project-name>
```

When you're done with the steps above, run the following command:

```bash
$ npm install # or yarn install
```

## Running the Project

Before starting the app you must create **~/.env** file with the following
variables:

```dotenv
NODE_PORT=3002
DB_MOCKING=true

API_VERSION=/api/v1

USE_COOKIE=false

# 1m = 60000
# 10m = 600000
# 1h = 3600000ms
JWT_EXPIRE=10m

# 1m = 60000ms
# 10m = 600000ms
# 1h = 3600000ms
JWT_COOKIE_EXPIRE=10m
JWT_SECRET=super-secret-word
```

Running the app in **development** mode.

```bash
$ npm run start:dev
```

## Running the Project in production mode.

Firstly, build the app with the following command:

```bash
$ npm run build
```

Running the app in **production** mode.

```bash
$ npm start
```

## Used technologies

- NodeJS- https://nodejs.org/en/
- Git - https://git-scm.com/
- TypeScript - https://www.typescriptlang.org/
- ExpressJS - https://expressjs.com/
- NeDB - https://github.com/louischatriot/nedb
- Postman - https://www.postman.com/

## NPM Packages

- [dotenv](https://github.com/motdotla/dotenv#readme)
- [morgan](https://github.com/expressjs/morgan)
- [colors](https://github.com/Marak/colors.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [xss-clean](https://github.com/jsonmaur/xss-clean)
- [helmet](https://helmetjs.github.io/)
- [hpp](https://github.com/analog-nico/hpp)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [cors](https://github.com/expressjs/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [typescript](https://www.npmjs.com/package/typescript)
- [NeDB](https://www.npmjs.com/package/nedb)
- [NeDB-Async](https://www.npmjs.com/package/nedb-async)
- [prettier](https://www.npmjs.com/package/prettier)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [jest](https://www.npmjs.com/package/jest)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)

## Made by

Author: [D. Hristov](https://dhristov.eu/) | [API Documentation](https://github.com/DeanHristov/fake-api-e-commerce/wiki) | [Postman Collection](./docs/postman_collection.json) |
Version: **v1.0.0**
