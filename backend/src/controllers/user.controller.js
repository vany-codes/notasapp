// Controlador de usuario

const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.js");

// Función para registrar un nuevo usuario

const registerUser = async (req, res, next) => {
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE correo_electronico = $1",
      [correo_electronico],
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES ($1, $2, $3) RETURNING id",
      [nombre, correo_electronico, hashedPassword],
    );

    // Devolvera solo el nombre del usuario
    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: result.rows[0].nombre,
    });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Funcion para login de usuario

const loginUser = async (req, res, next) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo_electronico = $1",
      [correo_electronico],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        correo_electronico: user.correo_electronico,
      },
      token,
    });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Función para obtener todos los usuarios

const getUsers = async (req, res, next) => {
  try {
    const results = await pool.query(
      "SELECT id, nombre, correo_electronico FROM usuarios",
    );
    res.status(200).json(results.rows);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Función para obtener un usuario por ID

const getUserById = async (req, res, next) => {
  //  const { id } = req.params;

  const id = req.user.id; // Obtener el ID del usuario autenticado desde el token

  try {
    const result = await pool.query(
      "SELECT id, nombre, correo_electronico FROM usuarios WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Función para actualizar un usuario por ID

const updateUser = async (req, res, next) => {
  const id = req.user.id;
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    // Verificar que el usuario exista
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const usuarioActual = result.rows[0];

    // Verificar si el correo ya pertenece a otro usuario
    if (
      correo_electronico &&
      correo_electronico !== usuarioActual.correo_electronico
    ) {// Verificar si el correo electrónico ya está registrado por otro usuario
      const existingUser = await pool.query(
        `SELECT id
         FROM usuarios
         WHERE correo_electronico = $1
         AND id <> $2`,
        [correo_electronico, id], // Excluir al usuario actual de la búsqueda y evitar conflictos
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          message: "Ese correo electrónico ya está registrado",
        });
      }
    }

    // Hashear la contraseña solo si fue enviada
    const hashedPassword = contrasena
      ? await bcrypt.hash(contrasena, 10)
      : usuarioActual.contrasena;

    // Actualizar usuario
    await pool.query(
      `UPDATE usuarios
       SET nombre = $1,
           correo_electronico = $2,
           contrasena = $3
       WHERE id = $4`,
      [
        nombre || usuarioActual.nombre,
        correo_electronico || usuarioActual.correo_electronico,
        hashedPassword,
        id,
      ],
    );

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

// Función para eliminar un usuario por ID

const deleteUser = async (req, res, next) => {
  const id = req.user.id; // Obtener el ID del usuario autenticado desde el token

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
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
