create database SafeCommerce;
use SafeCommerce;

create table Usuario (
id int primary key auto_increment,
nome varchar(45),
cnpj varchar(14),
email varchar(45) unique,
senha varchar(45)
) auto_increment = 10;