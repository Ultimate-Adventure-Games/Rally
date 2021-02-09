const { Pool } = require("pg");

const PG_URI =
//local db
  "postgres://lpklfpzm:5m3B5IB1bjDdOX6mSQLFVv13HXAjHJCQ@ziggy.db.elephantsql.com:5432/lpklfpzm";

const pool = new Pool({
  connectionString: PG_URI
})

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
  connect: (text, params, callback) => {
    console.log("executing transaction")
    return pool.connect(text, params, callback)
  }
}