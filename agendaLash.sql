-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    tipo varchar(30) NOT NULL
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataAg DATE NOT NULL,
    hora TIME NOT NULL,
    servico VARCHAR(100) NOT NULL,
    statusAg VARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
select * from usuarios;
select * from agendamentos;

ALTER TABLE usuarios
ADD COLUMN senha VARCHAR(255) NOT NULL;
