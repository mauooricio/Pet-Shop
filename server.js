// server.js
import 'dotenv/config';                    // carrega .env antes de qualquer coisa
import express from 'express';
import cors from 'cors';
import path from 'path';

// rotas
import authRoutes from './src/routes/authRoutes.js';
import agendamentoRoutes from './src/routes/agendamentoRoutes.js';

// só importe o módulo de DB; ele já faz a conexão
import './src/config/database.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve o front-end estático
app.use(express.static(path.resolve('public')));
app.use('/uploads', express.static(path.resolve('src/uploads')));

// monta a API
app.use('/auth', authRoutes);
app.use('/agendamentos', agendamentoRoutes);

// **FALLBACK PARA SPA**: qualquer rota não capturada volta ao HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/agendamentos.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ MySQL conectado em petshop`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
