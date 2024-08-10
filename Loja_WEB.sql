ALTER USER 'root'@'localhost' IDENTIFIED BY '123';

CREATE DATABASE Loja;

USE Loja;

CREATE TABLE Cliente (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Telefone VARCHAR(15),
    Endereco VARCHAR(255)
);

CREATE TABLE Produto (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Preco DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Pedido (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    ClienteID INT,
    DataPedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID)
);

CREATE TABLE ProdutoPedido (
    ProdutoPedidoID INT AUTO_INCREMENT PRIMARY KEY,
    PedidoID INT,
    ProdutoID INT,
    Quantidade INT NOT NULL,
    PrecoUnitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (PedidoID) REFERENCES Pedido(PedidoID)
        ON DELETE CASCADE,
    FOREIGN KEY (ProdutoID) REFERENCES Produto(ProdutoID)
);

INSERT INTO Cliente (Nome, Email, Telefone, Endereco) VALUES
('João Silva', 'joao@gmail.com', '123456789', 'Rua A, 123'),
('Maria Souza', 'maria@gmail.com', '987654321', 'Rua B, 456');

INSERT INTO Produto (Nome, Preco) VALUES
('Produto A', 10.00),
('Produto B', 20.00),
('Produto C', 30.00);

INSERT INTO Pedido (ClienteID, Status) VALUES
(1, 'Pendente'),
(2, 'Concluído');

INSERT INTO ProdutoPedido (PedidoID, ProdutoID, Quantidade, PrecoUnitario) VALUES
(1, 1, 2, 10.00),
(1, 3, 1, 30.00),
(2, 2, 1, 20.00),
(2, 3, 2, 30.00);