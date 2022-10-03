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
    senhaUser VARCHAR(65), 
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

CREATE TABLE historicoCpu(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,porcentagemUso DECIMAL(5,2)
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

-- select usuario.nome as nomeUser, usuario.email as emailUser, usuario.senha as senhaUser, empresa.nome as nomeEmpresa from usuario, empresa where usuario.email = "admin@Lojas_Americanas.com" and usuario.senha = "admin123" and fkEmpresa = idEmpresa;

select porcentagemCpu, horario from processo where fkServidor = '1';
select * from ram;
select * from usuario;
select * from disco;
select * from historicoCpu;
select * from processo;

create view usoAcimaDaMedia as select historicoCpu.id, historicoCpu.fkServidor as 'idServidor', historicoCpu.porcentagemUso, processo.nome,historicoCpu.qtdProcessos , totalMemoria, ram.porcentagemUso as "Porcentagem Ram", disco.lido, disco.escreveu, disco.porcentagemUso as 'porcentagemDisco', ram.horario, historicoCpu.Horario as 'Horario2'  from disco, processo, historicoCpu, ram where historicoCpu.porcentagemUso > 10.0 and historicoCpu.id = ram.id and historicoCpu.fkServidor = ram.fkServidor and historicoCpu.id = processo.id and historicoCpu.id = disco.id ORDER BY historicoCpu.porcentagemUso;
select * from usoAcimaDaMedia;

create view historicoSemana as select  historicoCpu.id, historicoCpu.fkServidor ,historicoCpu.porcentagemUso, historicoCpu.qtdProcessos, processo.nome, ram.totalMemoria, ram.porcentagemUso as 'Porcentagem Ram',disco.porcentagemUso as 'usoDisco', historicoCpu.horario  from ram, disco, processo, historicoCpu where historicoCpu.horario between current_date()-7 and current_date() and historicoCpu.id = ram.id and historicoCpu.id = disco.id and historicoCpu.id = processo.id and historicoCpu.fkServidor = ram.fkServidor and historicoCpu.fkServidor = disco.fkServidor and historicoCpu.fkServidor = processo.fkServidor;
select * from historicoSemana;

create view historicoMensal as select historicoCpu.id, historicoCpu.fkServidor, historicoCpu.porcentagemUso, historicoCpu.qtdProcessos, processo.nome, ram.totalMemoria, ram.porcentagemUso as 'Porcentagem Ram',disco.porcentagemUso as 'usoDisco', historicoCpu.horario  from ram, disco, processo, historicoCpu where historicoCpu.horario between current_date()-30 and current_date() and historicoCpu.id = ram.id and historicoCpu.id = disco.id and historicoCpu.id = processo.id and historicoCpu.fkServidor = ram.fkServidor and historicoCpu.fkServidor = disco.fkServidor and historicoCpu.fkServidor = processo.fkServidor;
select * from historicoMensal;