const errorMessages = {
    invalidCategoria: "Categoria não encontrada.",
    invalidEmailOrSenha: "Email e/ou senha inválido(s)",
    invalidToken: "Para acessar este recurso um token de autenticação válido deve ser enviado",
    duplicateEmail: "O e-mail informado já está sendo utilizado por outro usuário",
    server: "Erro interno do servidor.",
    clientNotFound: "Cliente não encontrado.",
    invalidProducts: "Produto não encontrado.",
    typeErrorString: (name) => `${name} deve ser uma string.`,
    typeErrorNumber: (name) => `${name} deve ser um number.`
};

module.exports = errorMessages;
