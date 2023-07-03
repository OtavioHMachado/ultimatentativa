const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const componentesRouter = require('./routes/componentes');
const equipamentosRouter = require('./routes/equipamentos');
const Componente = require('./models/Componente');
const Categoria = require('./models/Categoria');

const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Função para gerar o token JWT
function generateToken(user) {
  const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
  return token;
}

// Autenticação com JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário e senha estão corretos
  if (username === 'otavio' && password === '123') {
    const user = {
      id: 1,
      username: 'exampleUser',
    };
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});


app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});



app.use('/componentes', componentesRouter);
app.use('/equipamentos', equipamentosRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Modelo sincronizado com o banco de dados');
});