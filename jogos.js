app.post('/jogos', (req, res) => {
    try {
        const { titulo, preco, id_produtora } = req.body;

        if (!titulo || !preco || !id_produtora) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
        }

        const stmt = db.prepare(
         'INSERT INTO jogos (titulo, preco, id_produtora) VALUES (?, ?, ?)'
        );
        const resultado = stmt.run(titulo, preco, id_produtora);
    
        res.status(201).json({
            mensagem: 'Jogo criado!',
            id: resultado.lastInsertRowid
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar jogo' });
    }
});

app.put('/jogos/:titulo', (req, res) => {
    try {
        const { titulo } = req.params;
        const { preco } = req.body;
        if (!titulo || !preco ) {
            return res.status(400).json({ erro: 'Dados incompletos' });
        }
        const stmt = db.prepare(
        'UPDATE jogos SET preco = ? WHERE titulo = ?'
        );
        const resultado = stmt.run(preco, titulo);
        if (resultado.changes === 0) {
            return res.status(404).json({ erro: 'Jogo não encontrado' });
        }
        res.json({ mensagem: 'Preço atualizado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar preço' });
    }
});

app.get('/jogos', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM jogos');
        const jogos = stmt.all();   
        res.json({
            total: jogos.length,
            jogos: jogos
        });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar jogos' });
    }       
});


