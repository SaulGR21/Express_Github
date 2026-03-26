const express = require('express');
const pool = require('./db')
const app = express();


app.get('/', (req, res) => {  // Ruta principal
  res.send('API funcionando');
});


app.get('/usuario', (req, res) => {  // Endpoint GET /usuario
  const usuario = {
    id: 1,
    nombre: 'Juan',
    rol: 'Administrador'
  };

  res.json(usuario); // Aqui es para que envía el objeto como respuesta en formato JSON
});

pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error de conexión', err);
  });



// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});