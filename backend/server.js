const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Adicionar CORS

const app = express();
const port = 3000;

// Conecta ao banco local do MongoDB
mongoose.connect('mongodb://localhost:27017/banco1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS
app.use('/api/users', userRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
