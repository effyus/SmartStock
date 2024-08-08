const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'Loja'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Clientes
app.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM Cliente', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/clientes/:id', (req, res) => {
    const clienteId = req.params.id;
    connection.query('SELECT * FROM Cliente WHERE ClienteID = ?', [clienteId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    });
});

app.post('/clientes', (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    connection.query('INSERT INTO Cliente (Nome, Email, Telefone, Endereco) VALUES (?, ?, ?, ?)', [nome, email, telefone, endereco], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId });
    });
});

app.put('/clientes/:id', (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    connection.query('UPDATE Cliente SET Nome = ?, Email = ?, Telefone = ?, Endereco = ? WHERE ClienteID = ?', [nome, email, telefone, endereco, req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.delete('/clientes/:id', (req, res) => {
    connection.query('DELETE FROM Cliente WHERE ClienteID = ?', [req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.get('/total/clientes', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM Cliente', (error, results) => {
        if (error) throw error;
        res.json(results[0].total);
    });
});

// Produtos
app.get('/produtos', (req, res) => {
    connection.query('SELECT * FROM Produto', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/produtos/:id', (req, res) => {
    const produtoId = req.params.id;
    connection.query('SELECT * FROM Produto WHERE ProdutoID = ?', [produtoId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    });
});

app.post('/produtos', (req, res) => {
    const { nome, preco, estoque } = req.body;
    connection.query('INSERT INTO Produto (Nome, Preco, Estoque) VALUES (?, ?, ?)', [nome, preco, estoque], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId });
    });
});

app.put('/produtos/:id', (req, res) => {
    const { nome, preco, estoque } = req.body;
    connection.query('UPDATE Produto SET Nome = ?, Preco = ?, Estoque = ? WHERE ProdutoID = ?', [nome, preco, estoque, req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.delete('/produtos/:id', (req, res) => {
    connection.query('DELETE FROM Produto WHERE ProdutoID = ?', [req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.get('/total/produtos', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM Produto', (error, results) => {
        if (error) throw error;
        res.json(results[0].total);
    });
});

// Pedidos
app.get('/pedidos', (req, res) => {
    connection.query('SELECT * FROM Pedido', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/pedidos/:id', (req, res) => {
    const pedidoId = req.params.id;
    connection.query('SELECT * FROM Pedido WHERE PedidoID = ?', [pedidoId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Pedido não encontrado');
        }
    });
});

app.post('/pedidos', (req, res) => {
    const { clienteID, status } = req.body;
    connection.query('INSERT INTO Pedido (ClienteID, Status) VALUES (?, ?)', [clienteID, status], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId });
    });
});

app.put('/pedidos/:id', (req, res) => {
    const { clienteID, status } = req.body;
    connection.query('UPDATE Pedido SET ClienteID = ?, Status = ? WHERE PedidoID = ?', [clienteID, status, req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.delete('/pedidos/:id', (req, res) => {
    connection.query('DELETE FROM Pedido WHERE PedidoID = ?', [req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.get('/total/pedidos', (req, res) => {
    connection.query('SELECT COUNT(*) AS total FROM Pedido', (error, results) => {
        if (error) throw error;
        res.json(results[0].total);
    });
});

// ProdutoPedido
app.get('/produtopedidos', (req, res) => {
    connection.query('SELECT * FROM ProdutoPedido', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/produtopedidos/:id', (req, res) => {
    const produtoPedidoId = req.params.id;
    connection.query('SELECT * FROM ProdutoPedido WHERE ProdutoPedidoID = ?', [produtoPedidoId], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('ProdutoPedido não encontrado');
        }
    });
});

app.post('/produtopedidos', (req, res) => {
    const { pedidoID, produtoID, quantidade, precoUnitario } = req.body;
    connection.query('INSERT INTO ProdutoPedido (PedidoID, ProdutoID, Quantidade, PrecoUnitario) VALUES (?, ?, ?, ?)', [pedidoID, produtoID, quantidade, precoUnitario], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId });
    });
});

app.put('/produtopedidos/:id', (req, res) => {
    const { pedidoID, produtoID, quantidade, precoUnitario } = req.body;
    connection.query('UPDATE ProdutoPedido SET PedidoID = ?, ProdutoID = ?, Quantidade = ?, PrecoUnitario = ? WHERE ProdutoPedidoID = ?', [pedidoID, produtoID, quantidade, precoUnitario, req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.delete('/produtopedidos/:id', (req, res) => {
    connection.query('DELETE FROM ProdutoPedido WHERE ProdutoPedidoID = ?', [req.params.id], (error) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});