const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
res.json({ mensagem: 'PLATAFORMA ESTÁ FUNCIONANDO!' });
});
app.listen(PORT, () => {
console.log(`Servidor em http://localhost:${PORT}`);
});