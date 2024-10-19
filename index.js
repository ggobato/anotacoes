require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://35.156.79.210'
}));

// Criação de um pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Alterado para corresponder ao .env
  user: process.env.DB_USER,  // Alterado para corresponder ao .env
  password: process.env.DB_PASSWORD,  // Alterado para corresponder ao .env
  database: process.env.DB_DATABASE,  // Alterado para corresponder ao .env
  port: process.env.DB_PORT || 3306
});

// Endpoint para buscar clientes
app.get('/boletim', (req, res) => {
  const query = "SELECT a.nome, d.nome AS disciplina, n.nota FROM alunos AS a INNER JOIN disciplinas AS d ON d.disciplina_id = a.alunos_id INNER JOIN notas AS n ON n.nota_id = d.disciplina_id;";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).send("Erro ao consultar o banco de dados.");
    }
    res.json(results);
  });
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
