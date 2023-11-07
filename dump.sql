create database pdv;

create table usuarios (
    id serial primary key,
    nome text not null,
    email text unique not null,
    senha text not null
);
create table categorias (
    id serial primary key,
    descricao text not null
);

create table produtos(
    id serial primary key,
    descricao text,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null references categorias(id)
);

create table clientes(
    id serial primary key,
    nome text not null,
    email text unique not null,
    cpf text unique not null,
    cep text,
    rua text,
    numero text,
    bairro text,
    cidade text,
    estado text
);

INSERT INTO categorias (descricao)
VALUES ('Informática'),
    ('Celulares'),
    ('Chevrolet'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');