# PetShop Agendamentos

Um sistema de agendamento para pet shop, com frontend em HTML/CSS/JS e backend em Node.js, Express, MySQL e JWT para autenticação.

---

## 🚀 Funcionalidades

- **Registro e login** de usuários via JWT  
- **CRUD de agendamentos**  
  - Nome do pet, raça, data/hora, observações  
  - Upload de imagem do pet  
- **Interface responsiva** e estilizada em CSS puro  

---

## 📦 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Fetch API)  
- **Backend**: Node.js, Express, multer, bcrypt, jsonwebtoken  
- **Banco de dados**: MySQL (mysql2/promise)  
- **Ambiente**: dotenv, nodemon (desenvolvimento)  

---

## 💻 Instalação

1. **Clone o repositório**  
   ```bash
   git clone <URL-do-seu-repo>
   cd petshop

Instale dependências

bash
npm install

Configure variáveis de ambiente

Crie um arquivo .env na raiz com:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=petshop
JWT_SECRET=umSegredoBemSeguro

Crie o banco e as tabelas

bash
mysql -u root -p < banco_petshop.sql

Inicie o servidor

bash
Copiar
Editar
npm start

Acesse no navegador

http://localhost:3000/login.html

http://localhost:3000/register.html

Após login: http://localhost:3000/agendamentos.html

/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js
│   │   └── agendamentos.js
│   ├── login.html
│   ├── register.html
│   └── agendamentos.html
├── src/
│   ├── config/        # conexão MySQL (database.js)
│   ├── controllers/   # lógica de rotas (authController, agendamentoController)
│   ├── middlewares/   # authMiddleware, multer upload
│   ├── models/        # funções de acesso a dados
│   └── routes/        # definição de endpoints (authRoutes, agendamentoRoutes)
├── src/uploads/       # arquivos de imagem enviados
├── banco_petshop.sql  # script de criação do banco/tabelas
├── .env               # variáveis de ambiente
├── package.json
└── server.js          # ponto de entrada do backend
