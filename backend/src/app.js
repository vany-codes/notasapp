const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const notasRoutes = require('./routes/notas.routes');
const errorHandler = require('./middlewares/error.middleware');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Configurar rutas
app.use('/api', userRoutes);
app.use('/api', notasRoutes); // Rutas para notas

app.get('/', (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});
app.use(errorHandler); // Middleware para manejar errores 

module.exports = app;