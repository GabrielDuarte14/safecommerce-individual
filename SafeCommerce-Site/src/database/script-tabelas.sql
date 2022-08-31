CREATE DATABASE safecommerce;
USE safecommerce;

CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(45),
    emailEmpresa VARCHAR(45),
    senhaEmpresa VARCHAR(45),
    cnpj CHAR(18)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUser VARCHAR(45),
    emailUser VARCHAR(45),
    senhaUser VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
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

select usuario.nome as nomeUser, usuario.email as emailUser, usuario.senha as senhaUser, empresa.nome as nomeEmpresa from usuario, empresa where usuario.email = "admin@Lojas_Americanas.com" and usuario.senha = "admin123" and fkEmpresa = idEmpresa;

select * from empresa;
select * from usuario;
select * from servidor;
    