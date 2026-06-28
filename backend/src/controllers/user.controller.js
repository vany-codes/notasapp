// Controlador de usuario

const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

// Función para registrar un nuevo usuario

const createUser = async (req, res) => {
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
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
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};