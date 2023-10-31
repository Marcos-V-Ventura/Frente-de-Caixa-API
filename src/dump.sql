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
--25 ususarios com senha 123456 padrão para todos com bcrypt hash(10)
INSERT INTO usuarios (nome, email, senha)
VALUES (
        'Lucius Harding',
        'nec@yahoo.net',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Adam Davis',
        'quam@google.edu',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Emma Sosa',
        'adipiscing.enim@protonmail.net',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Elliott Wilcox',
        'ligula.consectetuer.rhoncus@outlook.ca',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Keaton Maxwell',
        'euismod.ac.fermentum@protonmail.couk',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Zephr Barlow',
        'molestie.orci.tincidunt@google.com',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Bruce Duncan',
        'donec.nibh@protonmail.org',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Ulric Raymond',
        'amet.ante.vivamus@aol.edu',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Gemma Wallace',
        'leo.morbi@protonmail.ca',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Brent Blanchard',
        'sapien.cursus@yahoo.ca',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Kimberly Gibson',
        'felis.ullamcorper.viverra@aol.edu',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Xenos Zimmerman',
        'eget@aol.net',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Troy Kline',
        'tempor.augue.ac@yahoo.org',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Noelani Hardin',
        'risus.donec@aol.net',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Bert Velazquez',
        'tortor@hotmail.com',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Ezekiel Richardson',
        'magna.a@protonmail.net',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Delilah Knapp',
        'amet.nulla@icloud.edu',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Hamilton Rice',
        'nunc.ac@icloud.couk',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Kaitlin Baldwin',
        'sagittis@hotmail.couk',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Brent Smith',
        'magnis@hotmail.ca',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Tiger Wilson',
        'nulla.facilisi@outlook.com',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Hollee Moss',
        'risus.donec.nibh@protonmail.com',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Jakeem Ball',
        'mauris.magna@protonmail.org',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Sopoline Kinney',
        'sit.amet@icloud.org',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    ),
    (
        'Evan Cohen',
        'ac.mi@aol.com',
        '$2a$10$oOPx2kFUzwldvh2XdJ6A7.pNnv4GfmOFs00Y0IFYGNWCu7ocTkDFO'
    );
INSERT INTO categorias (descricao)
VALUES ('Toyota'),
    ('RAM Trucks'),
    ('Chevrolet'),
    ('Mercedes-Benz'),
    ('Nissan'),
    ('General Motors'),
    ('Hyundai Motors'),
    ('GMC'),
    ('Acura'),
    ('Kia Motors');