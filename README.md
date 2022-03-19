# Coffee shop database

A database for Database class.

- Trần Tuấn Thịnh - 20020265
- Quách Ngọc Minh - 20020261
- Nguyễn Việt Hoàng - 20020196

## Table of content

- [Coffee shop database](#coffee-shop-database)
  - [Table of content](#table-of-content)
  - [Prerequisites](#prerequisites)
  - [Database Design](#database-design)
  - [Preview](#preview)
    - [Database](#database)

## Prerequisites

- npm and yarn 1.x

## Database Design

Use PostgreSQL database with TypeORM for querying

![coffee shop diagram.png](docs/coffee%20shop%20diagram.png)

[Link to EER diagram](docs/Coffee%20shop.mwb)

## Preview

- Go to <https://whatever-coffee-shop.herokuapp.com/>

### Database

If you want to run this database locally then do the following

- Clone this github repo to your local machine
- Create an empty database name coffee in your PostgreSQL database
- Open a terminal at api folder, run `copy env.example .env` and change corresponding variable to match your local database
- Still at that terminal, run `yarn` to install all dependencies and `yarn run migration:run` to import data to your database
- Run the server with `yarn start:prod`
