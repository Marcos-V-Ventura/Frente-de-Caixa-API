const knex = require('../connection');
const errorMessages = require('../helpers/errorMessages');
require('dotenv').config();

const registerCustomer = async (req, res) => {
    const {nome, email, cpf} = req.body
    
    try {
        const registerCustomer = await knex('clientes')
        .insert({nome, email, cpf})
        .returning('*');
        console.log(registerCustomer);
        if (!registerCustomer){return res.status(501).json({mensagem: errorMessages.customerWasNotRegistered})}

        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({mensagem: errorMessages.server})
    }
}

const editCustomer = async (req, res) => {
    const {nome, email, cpf} = req.body;
    const { id } = req.params;
    try {
        let queryParams = [];
        
        if (nome){ 
            const paramsNome = `nome = '${nome}'`;
            queryParams.push(paramsNome);
        }
        if (email) {
            const paramsEmail = `email = '${email}'`;
            queryParams.push(paramsEmail);
        }
        if (cpf) {
            const paramsCPF = `cpf = '${cpf}'`;
            queryParams.push(paramsCPF);
        }
        
        const update = await knex.raw(`UPDATE clientes SET ${queryParams} WHERE id = ?`, [id]);
        if(!update.rowCount) {return res.status(501).json({mensagem: errorMessages.server})}
        
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({mensagem: errorMessages.server})
    }
}

module.exports = { 
    registerCustomer,
    editCustomer
}