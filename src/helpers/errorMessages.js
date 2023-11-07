const errorMessages = {
    invalidCategoria: "Categoria não encontrada.",
    invalidProduto: "Produto não encontrado.",
    invalidEmailOrSenha: "Email e/ou senha inválido(s)",
    invalidToken: "Para acessar este recurso um token de autenticação válido deve ser enviado",
    duplicateEmail: "O e-mail informado já está sendo utilizado por outro usuário",
    server: "Erro interno do servidor.",
    typeErrorString: (name) => `${name} deve ser uma string.`,
    typeErrorNumber: (name) => `${name} deve ser uma string.`
} 

module.exports = errorMessages;