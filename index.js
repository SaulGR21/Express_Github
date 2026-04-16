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
    res.json(resultado.rows); // Enviamos los datos al cliente (navegador o Postman)git
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// Definimos una ruta POST en el endpoint '/alumnos' para recibir datos
app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    if (!nombre || !apellido || !edad || !correo) { // Validación: Verificamos que todos los campos requeridos existan
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });  // Si falta algún campo, detenemos la ejecución y respondemos con un error 400
    }

    const resultado = await pool.query(
      'INSERT INTO alumno (nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, correo]
    );

    res.status(201).json({
      mensaje: 'Alumno insertado correctamente',
      alumno: resultado.rows[0]  // Enviamos el registro que se guardó en la base de datos
    }); 
  } catch (error) {
    console.error('Error al insertar alumno:', error);
    res.status(500).json({ error: 'Error al insertar el alumno' }); //Respondemos al cliente con un error 500
  }
});
 
 //Ruta con SELECT pero para la tabla usuario
app.get('/usuario', (req, res) => {
  const usuario = {
    id: 1,
    nombre: 'Juan',
    rol: 'Administrador'
  };

  res.json(usuario);
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});