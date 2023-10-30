create database projeto_pdv_final;

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