# Car Tracking API

A car location tracking RESTful API server that allows users to track cars location, and get reports about their speed.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (.env_template file could be renamed and used)

### **APP CONFIGURATION**

`NODE_ENV` \
`CORS_WHITELIST` \
`PORT` \
`LOG_LEVEL`

### **DATABASE CREDENTIALS**

`DATABASE_URI` \
`DATABASE_PASSWORD`

## Run Locally

Clone the project

```bash
  git clone https://github.com/husseinshaltout/Car-Tracking.git
```

Go to the project directory

```bash
  cd car-tracking-api
```

Install dependencies

```bash
  npm install
```

#### In a terminal tab, create and run the database:

- start psql `psql postgres`
- in psql run the following:
  - `CREATE USER username WITH PASSWORD 'password123';`
  - `CREATE DATABASE cartracking_db;`
  - `CREATE DATABASE cartracking_test_db;`
  - `\c cartracking_db`
  - `GRANT ALL PRIVILEGES ON DATABASE cartracking_test_db TO username;`
  - `GRANT ALL PRIVILEGES ON DATABASE cartracking_db TO username;`
- to test that it is working run `\dt` and it should output "No relations found."
- update .env file to match new info

Start the server

```bash
  npm run start
```

Start development server

```bash
  npm run start:dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Build

To build, run the following command

```bash
  npm run build
```

## API Refrence

- API Refrence can be found here [API.md](./docs/API.md)

## Database Design

![Alt text](./docs/car-tracking_ERD.png?raw=true 'ERD')

## Authors

- [@husseinshaltout](https://www.github.com/husseinshaltout)
