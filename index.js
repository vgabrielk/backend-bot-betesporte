require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authMiddleware = require('./middleware/authMiddleware');
const usersRoutes = require('./routes/users');
const accountsRoutes = require('./routes/accounts');
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/', usersRoutes);
app.use('/accounts', authMiddleware.authenticateToken, accountsRoutes); // Protegendo as rotas de contas com o middleware de autenticação

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})