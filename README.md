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
  - [Database Local](#database-local)
  - [Preview](#preview)

## Prerequisites

- npm and yarn 1.x

## Database Design

Use PostgreSQL database with TypeORM for querying

![coffee shop diagram.png](docs/coffee%20shop%20diagram.png)

[Link to EER diagram](docs/Coffee%20shop.mwb)

- Customer Table is where we store customers' information. There are 5 different rows which are **id**, **first name**, **last name**, **balance** and **address**
- Order Table is where we store orders' information. We can see each each orders' **id**, **customerID**, **storeID**, **date**, and **total price** of the order.
- In OrderDetails, we include details for each order. For example, a customer has 1 order with 2 difference product, this table will dispay each item price.
- Next is the Product Table, we have products' **name**, **price** for each of them, and the **cost** of each product. We also separate each product into it own **category** and keep track of their **inventory**.
- In the Store Table, we include the **location** of each store, **total revenue** in each store and the **cost** it took to operate.
- Go to the SupplierDetails Table, we have suppliers' information and their transaction with the shop.
- Lastly, in the suppliers Table, we have the supplier basic information like **name** and the total amount of **money paid** for each supplier

## Database Local

If you want to run this database locally then do the following

- Clone this github repo to your local machine
- Create an empty database name coffee in your PostgreSQL database
- Open a terminal at api folder, run `copy env.example .env` and change corresponding variable to match your local database
- Still at that terminal, run `yarn` to install all dependencies and `yarn run migration:run` to import data to your database
- Run the server with `yarn start:prod`

## Preview

- Go to <https://whatever-coffee-shop.herokuapp.com/> for the web version if (which we don't have yet 🙃)
- Documentation for API <https://whatever-coffee-shop.herokuapp.com/api/docs/>
