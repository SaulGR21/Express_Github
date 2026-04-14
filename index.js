const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

//Ruta con SELECT para la tabla alumno
app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno'); // Consultamos a la base de datos react_express_db
    res.json(resultado.rows); // Enviamos los datos al cliente (navegador o Postman)
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});