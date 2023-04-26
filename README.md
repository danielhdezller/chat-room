# Chat-Room
Its a chat room with users and messages.

## Docker

```bash
# start the DB
$ cd ./docker
# To run db at docker Development | Test Mode
$ docker-compose up chat-room-sql-server
# To run server and db at docker Production Mode
$ docker-compose up
```

## Installation

```bash
# install the node modules
$ cd ./project
$ yarn
```

## Env files

-At Project:
Copy at the project folder the "config.json.example-development" with the name "config.json" or to run the test "config.json.example-test" with the name "config.json".

-At Docker:
copy the .env.example as .env

## Typeorm
```bash
# Run initial migrations.
$ yarn typeorm migration:run
```

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```

## Note: 
This project works with the same DB for Test and Development mode. It can be solve by adding a DB-Test running at Docker

## Stay in touch

- Author - [Daniel Hernández](https://github.com/danielhdezller)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/daniel-hernandez-ller/)
