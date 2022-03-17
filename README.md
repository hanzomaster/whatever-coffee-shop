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
  - [How to run](#how-to-run)

## Prerequisites

- MySQL database on your local machine
- npm and yarn 1.x

## Database Design

Use MySQL database with TypeORM for querying

![coffee shop diagram.png](docs/coffee%20shop%20diagram.png)

[Link to EER diagram](docs/Coffee%20shop.mwb)

## How to run

- Clone this github repo to your local machine
- Create an empty database coffee in your MySQL database
- Open your terminal at api folder and run `yarn run migration:run` to import data to your database
- Run the server with `yarn start:prod`
