const { Pool } = require('pg');  //Importa la clase Pool del paquete 'pg' (PostgreSQL)

const pool = new Pool({  //Crea una "pool" de conexiones (permite manejar varias conexiones a la BD)
  user: 'inquerman_guzman',
  host: 'localhost',
  database: 'react_express_db',
  password: 'orus2102',
  port: 5432,
});

module.exports = pool;