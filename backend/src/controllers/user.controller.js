// Controlador de usuario

const pool = require('../config/db.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.js');

// Función para registrar un nuevo usuario

const registerUser = async (req, res) => {
  const { nombre, correo_electronico, contrasena } = req.body;

  try {

    // Verificar si el correo electrónico ya está registrado
    const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = $1', [correo_electronico]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES ($1, $2, $3) RETURNING id',
      [nombre, correo_electronico, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      userId: result.rows[0].id
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};


// Funcion para login de usuario

const loginUser = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = $1', [correo_electronico]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);

    res.status(200).json({ message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        correo_electronico: user.correo_electronico
      },
      token
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Función para obtener todos los usuarios

const getUsers = async (req, res) => {
  try {
    const results = await pool.query('SELECT id, nombre, correo_electronico FROM usuarios');
    res.status(200).json(results.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Función para obtener un usuario por ID

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, nombre, correo_electronico FROM usuarios WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Función para actualizar un usuario por ID

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : result.rows[0].contrasena;

    await pool.query(
      'UPDATE usuarios SET nombre = $1, correo_electronico = $2, contrasena = $3 WHERE id = $4',
      [nombre || result.rows[0].nombre, correo_electronico || result.rows[0].correo_electronico, hashedPassword, id]
    );

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Función para eliminar un usuario por ID

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};