app.post('/produtoras', (req, res) => {
    try {
        const { nome, cnpj, website } = req.body;

        if (!nome || !cnpj || !website) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const stmt = db.prepare(
         'INSERT INTO produtoras (nome, cnpj, website) VALUES (?, ?, ?)'
        );
        const resultado = stmt.run(nome, cnpj, website);
    
        res.status(201).json({
            mensagem: 'Produtora criada!',
            id: resultado.lastInsertRowid
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar produtora' });
    }
});

app.get('/produtoras', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM produtoras');
        const produtoras = stmt.all();
  
        res.json({
            total: produtoras.length,
            produtoras: produtoras
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar produtos' });
    }
});
