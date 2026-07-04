const pool = require('../config/db.js');

const getNotas = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM notas');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const getNotasByUsuarioId = async (req, res, next) => {
    const usuarioId = req.user.id; // Obtener el ID del usuario autenticado desde el token
    try {
        const result = await pool.query('SELECT * FROM notas WHERE usuario_id = $1', [usuarioId]);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const createNota = async (req, res, next) => {
    const { titulo, contenido, prioridad, estado } = req.body;
    const usuarioId = req.user.id; // Obtener el ID del usuario autenticado desde el token
    try {
        const result = await pool.query(
            'INSERT INTO notas (titulo, contenido, prioridad, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, contenido, prioridad, estado, usuarioId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const updateNota = async (req, res, next) => {
    const { id } = req.params;
    const { titulo, contenido, prioridad, estado } = req.body;
    const usuarioId = req.user.id;
    try {
        const result = await pool.query(
            'UPDATE notas SET titulo = $1, contenido = $2, prioridad = $3, estado = $4 WHERE id = $5 AND usuario_id = $6 RETURNING *',
            [titulo, contenido, prioridad, estado, id, usuarioId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const deleteNota = async (req, res, next) => {
    const { id } = req.params;
    const usuarioId = req.user.id;
    try {
        const result = await pool.query(
            'DELETE FROM notas WHERE id = $1 AND usuario_id = $2 RETURNING *',
            [id, usuarioId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotas,
    getNotasByUsuarioId,
    createNota,
    updateNota,
    deleteNota
};