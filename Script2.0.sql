CREATE DATABASE safecommerce;

USE safecommerce;

create table Empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(65),
    cnpj char(14)
);

create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
	email varchar(45),
	senha varchar(65),
	fkUsuario int,
    foreign key (fkUsuario) references Usuario(idUsuario),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Servidor(
	idServidor int primary key,
    modelo varchar(45),
	so varchar(45),
    enderecoMac varchar(45),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Metrica(
	idMetrica int primary key,
    nome varchar(45),
	comando varchar(45),
    unidadeMedida varchar(45)
);

create table Parametro(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica)
);

create table Leitura(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica),
	dataLeitura datetime,
    primary key (dataLeiura),
    valorLeitura varchar(45),
    componente varchar(45)
);

select Usuario.nome as nomeUser, Usuario.email as emailUser, Usuario.senha as senhaUser, Empresa.nome as nomeEmpresa from Usuario, Empresa where Usuario.email = "admin@Lojas_Americanas.com" and usuario.senha = "admin123" and fkEmpresa = idEmpresa;
