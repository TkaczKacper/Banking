const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
   username: process.env.DATABASE_USERNAME,
   host: process.env.DATABASE_HOST,
   database: process.env.DATABASE_NAME,
   password: process.env.DATABASE_PASSWORD,
   port: process.env.DATABASE_PORT,
});

export default pool;
