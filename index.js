const express = require('express');
const app = express();


app.get('/', (req, res) => {  // Ruta principal
  res.send('API funcionando');
});


app.get('/usuario', (req, res) => {  // Endpoint GET /usuario
  const usuario = {
    id: 1,
    nombre: 'Saul',
    rol: 'Estudiante'
  };

  res.json(usuario); // Aqui es para que envía el objeto como respuesta en formato JSON
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});