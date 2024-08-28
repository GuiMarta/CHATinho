const token = require("../util/jwt.js");
const usuarioModel = require("../models/usuarioModel.js");

exports.entrar = async (nick) => {
    try {
        let resp = await usuarioModel.registrarUsuario(nick);
        if (resp.insertedId) {
            return {
                "idUser": resp.insertedId,
                "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''), nick),
                "nick": nick
            };
        } 
        else {
            throw new Error("Falha ao registrar usuário");
        }
    } 
    catch (error) {
        console.error("Erro ao entrar:", error);
        throw new Error("Erro ao entrar");
    }
};