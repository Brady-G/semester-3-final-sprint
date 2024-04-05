## Final Sprint S3

### Setup
- Install the required packages using the following command:
```bash
npm install
```
- Create the postgres database by using the `create_data.sql` file in the database folder.
- Create the mongo database and a collection named `data` and populate it with the data in `create_data.json` file in the database folder.
- Setup mongo database search index using the `create_search.json` file in the database folder and name it `text`.
- After both the mongo and postgres databases are setup fill in the required details in the `.env` file.
  - Postgres Info
    - `PG_USER` - Postgres username
    - `PG_PASS` - Postgres password
    - `PG_HOST` - Postgres host
    - `PG_PORT` - Postgres port
    - `PG_DATABASE` - Postgres database name
  - Mongo Info
    - `MONGO_URL` - Mongo connection URL
    - `MONGO_DATABASE` - Mongo database name
  - JWT Secret
    - `JWT_SECRET` - Secret key for JWT token
- Now you can start the server using the following command:
```bash
npm start
```
- You can optionally add the `PORT` variable in the `.env` file to change the port on which the server runs, by default it runs on port 3000.

> Note:
> I used 2 GitHub accounts to work on this project my main account ThatGravyBoat and my school account Brady-G