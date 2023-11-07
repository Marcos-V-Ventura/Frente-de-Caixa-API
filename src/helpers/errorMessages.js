const errorMessages = {
    invalidCategoria: "Categoria não encontrada.",
    invalidEmailOrSenha: "Email e/ou senha inválido(s)",
    invalidProduto: "Produto não encontrado.",
    invalidToken: "Para acessar este recurso um token de autenticação válido deve ser enviado",
    duplicateEmail: "O e-mail informado já está sendo utilizado por outro usuário",
    duplicateCPF: "O CPF informado já está sendo utilizado por outro usuário",
    server: "Erro interno do servidor.",
    customerNotFound: "Cliente não encontrado",
    customerWasNotRegistered : "Cliente não foi cadastrado.",
    server: "Erro interno do servidor.",
    clientNotFound: "Cliente não encontrado.",
    invalidProducts: "Produto não encontrado.",
    typeErrorString: (name) => `${name} deve ser uma string.`,
    typeErrorNumber: (name) => `${name} deve ser uma string.`
};

module.exports = errorMessages;
