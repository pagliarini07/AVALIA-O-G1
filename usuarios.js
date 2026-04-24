app.post('/usuarios', (req, res) => {
    try {
        const { nome, cpf, email } = req.body;

        if (!nome || !cpf || !email) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const stmt = db.prepare(
         'INSERT INTO usuarios (nome,cpf,email) VALUES (?, ?, ?)'
        );
        const resultado = stmt.run(nome, cpf, email);

        res.status(201).json({
            mensagem: 'Usuário criado!',
            id: resultado.lastInsertRowid
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
});

app.get('/usuarios', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM usuarios');
        const usuarios = stmt.all();    
        res.json({
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
});

app.delete('/usuarios/:nome', (req, res) => {
    try {
        const { nome } = req.params;        
        const stmt = db.prepare('DELETE FROM usuarios WHERE nome = ?');
        const resultado = stmt.run(nome);   
        if (resultado.changes === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }   
});