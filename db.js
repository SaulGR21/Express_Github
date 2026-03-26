const { Pool } = require('pg');

const pool = new Pool({
  user: 'inquerman_guzman',
  host: 'localhost',
  database: 'react_express_db',
  password: 'orus2102',
  port: 5432,
});

module.exports = pool;