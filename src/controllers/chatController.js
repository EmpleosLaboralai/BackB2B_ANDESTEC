const chatService = require('../services/chatService');


exports.registrarChat = async function (req,res) {
    const body = req.body;
    const respLog = await chatService.registrarChat(body);
    return res.json(respLog);
}

exports.listarChatPorReclutadorCandidato = async function (req,res) {
    const body = req.body;
    const respLog = await chatService.listarChatPorReclutadorCandidato(body);
    return res.json(respLog);
}