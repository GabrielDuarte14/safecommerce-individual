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

CREATE TABLE processo(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,nome VARCHAR(40)
    ,porcentagemCpu DECIMAL(5,2)
    ,fkServidor INT
    ,FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
	,horario DATETIME
);

CREATE TABLE ram(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,totalMemoria DECIMAL(5,2)
    ,porcentagemUso DECIMAL(5,2)
    ,fkServidor INT
    ,FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
    ,horario DATETIME
);

CREATE TABLE swap(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,totalMemoria DECIMAL(5,2)
    ,porcentagemUso DECIMAL(5,2)
    ,fkServidor INT
    ,FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
	,horario DATETIME
);

CREATE TABLE HistoricoCpu(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,porcentagemUso DECIMAL(5,2)
    ,porcentagemUsoCore1 DECIMAL(5,2)
    ,porcentagemUsoCore2 DECIMAL(5,2)
    ,porcentagemUsoCore3 DECIMAL(5,2)
    ,porcentagemUsoCore4 DECIMAL(5,2)
    ,qtdProcessos INT
    ,fkServidor INT
    ,FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
    ,horario DATETIME
);

CREATE TABLE disco(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,porcentagemUso DECIMAL(5,2)
    ,lido DECIMAL(5,2) 
    ,escreveu DECIMAL(5,2)
    ,fkServidor INT
    ,FOREIGN KEY (fkServidor) REFERENCES servidor(idServidor)
    ,horario DATETIME
);

select usuario.nome as nomeUser, usuario.email as emailUser, usuario.senha as senhaUser, empresa.nome as nomeEmpresa from usuario, empresa where usuario.email = "admin@Lojas_Americanas.com" and usuario.senha = "admin123" and fkEmpresa = idEmpresa;

select porcentagemCpu, horario from processo where fkServidor = '1';
select * from ram;
select * from disco;
select * from historicoCpu;
select * from processo;

create view UsoAcimaDaMedia as select historicoCPU.id, historicoCpu.fkServidor as 'idServidor', historicoCPU.porcentagemUso, processo.nome,historicoCpu.qtdProcessos , totalMemoria, ram.porcentagemUso as "Porcentagem Ram", disco.lido, disco.escreveu, disco.porcentagemUso as 'porcentagemDisco', ram.horario, historicoCPU.Horario as 'Horario2'  from disco, processo, historicoCpu, ram where historicoCPU.porcentagemUso > 65.0 and historicoCpu.id = ram.id and historicoCpu.fkServidor = ram.fkServidor and HistoricoCpu.id = processo.id and HistoricoCpu.id = disco.id ORDER BY historicoCpu.porcentagemUso;
drop view UsoAcimaDaMedia;
select * from UsoAcimaDaMedia;



drop database safecommerce;