const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

// ROTAS
app.use('/', router.get('/', (req, res, next) => {
    res.status(200).send(`
        <body style="background-color: black; color: white;">
            API do chatinhoDoGui Online.
        </body>
    `);
}));

app.use('/', router.get('/sobre', (req, res, next) => {
    res.status(200).send({
        "nome": "chatinhoDoGui",
        "versao": "0.1",
        "autor": "Guilherme Marta"
    });
}));

app.use("/salas", router.get("/salas", async (req, res, next) => {
    const jwt = require("./util/jwt.js");
    const salaController = require("./controllers/ControladorSalas.js");
    const token = req.headers.token;
    const iduser = req.headers.iduser;
    const nick = req.headers.nick;

    const teste = await jwt.checkToken(token, iduser, nick);
    console.log(teste);
    if (teste) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(401).send({ mensagem: "Token inválido" });
    }
}));

app.use("/sala/enviar", router.post("/sala/enviar", async (req, res) => {
    const jwt = require("./util/jwt.js");
    const salaController = require("./controllers/ControladorSalas.js");
    if (!jwt.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return false;
    const nick = req.headers.nick;
    const mensagem = req.body.msg;
    const idSala = req.body.idSala;
    let resp = await salaController.enviarMensagem(nick, mensagem, idSala);
    res.status(200).send(resp);
}));

app.use("/sala/listar", router.get("/sala/listar", async (req, res) => {
    const jwt = require("./util/jwt.js");
    const salaController = require("./controllers/ControladorSalas.js");

    if (!jwt.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) return false;
    const idSala = req.body.idSala;
    const timestamp = req.body.timestamp;
    let resp = await salaController.buscarMensagens(idSala, timestamp);
    res.status(200).send(resp);
}));

app.use("/sala/entrar", router.post("/sala/entrar", async (req, res) => {
    const jwt = require("./util/jwt.js");
    const salaController = require("./controllers/ControladorSalas.js");
    if (jwt.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
        res.status(200).send(resp);
    } else {
        res.status(401).send({ msg: "Usuário não autorizado" });
    }
}));

app.use("/entrar", router.post("/entrar", async (req, res, next) => {
    const usuarioController = require("./controllers/ControladorUsuarios.js");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

module.exports = app;