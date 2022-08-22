CREATE DATABASE safecommerce;
USE safecommerce;

CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    cnpj CHAR(18)
);

CREATE TABLE servidor (
	idServidor INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(45),
    so VARCHAR(45),
    qtd_cpus INT,
    qtd_memoria_ram INT,
    qtd_disco INT,
    fkEmpresa INT,
    FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);
    