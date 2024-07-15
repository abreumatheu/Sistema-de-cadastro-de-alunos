const express = require('express');
const app = express();
const port = 3002; // Porta alterada para 3001

app.use(express.json());

let alunos = [];

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Alunos!');
});

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.post('/alunos', (req, res) => {
  const novoAluno = req.body;
  novoAluno.id = alunos.length ? alunos[alunos.length - 1].id + 1 : 1;
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

app.put('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index !== -1) {
    alunos[index] = { ...alunos[index], ...req.body };
    res.json(alunos[index]);
  } else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.delete('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index !== -1) {
    const alunoRemovido = alunos.splice(index, 1);
    res.json(alunoRemovido);
  } else {
    res.status(404).send('Aluno não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
