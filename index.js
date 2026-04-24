const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

//Ruta con SELECT para la tabla materias
app.get('/materias', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM materia'); // Consultamos a la base de datos react_express_db
    res.json(resultado.rows); // Enviamos los datos al cliente (navegador o Postman)git
  } catch (error) {
    console.error('Error al consultar materias:', error);
    res.status(500).json({ error: 'Error al obtener las materias' });
  }
});

// Ruta con el SELECT para el id de materias
app.get('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Aqui estara la validacion se que le hara
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const resultado = await pool.query(
      'SELECT * FROM materia WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar materia:', error);
    res.status(500).json({ error: 'Error al obtener la materia' });
  }
});

// Definimos una ruta POST en el endpoint '/alumnos'(En esta actividad sera '/materias') para recibir datos
app.post('/materias', async (req, res) => {
  try {
    const { nombre, semestre, creditos } = req.body;

    if (!nombre || !semestre || !creditos) { // Validación: Verificamos que todos los campos requeridos existan
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });  // Si falta algún campo, detenemos la ejecución y respondemos con un error 400
    }

    const resultado = await pool.query(
      'INSERT INTO materia (nombre, semestre, creditos) VALUES ($1, $2, $3 ) RETURNING *',
      [nombre, semestre, creditos]
    );

    res.status(201).json({
      mensaje: 'Materia insertado correctamente',
      materia: resultado.rows[0]  // Enviamos el registro que se guardó en la base de datos
    }); 
  } catch (error) {
    console.error('Error al insertar materia:', error);
    res.status(500).json({ error: 'Error al insertar el materia' }); //Respondemos al cliente con un error 500
  }
});
 

//Ruta con SELECT pero para la tabla usuario
app.get('/usuarios', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuario');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});


// Ruta con el SELECT para el id de usuarios
app.get('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Aqui esta la validacion que se Hara
    if (isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const resultado = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});




app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});