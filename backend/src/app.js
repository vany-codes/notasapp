const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

// Configurar rutas
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

module.exports = app;