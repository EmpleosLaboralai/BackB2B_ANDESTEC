const empleosService = require('../services/empleosService');

exports.registrarEmpleos = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.registrarEmpleo(body);
    return res.json(respLog);
}

exports.listarEmpleosPorUsuario = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarEmpleosPorIdUser(body);
    return res.json(respLog);
}

exports.listarEmpleosopenClose = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarEmpleosOpenClose(body);
    return res.json(respLog);
}

exports.eliminarEmpleoPorId = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.eliminarEmpleoPorId(body);
    return res.json(respLog);
}

exports.listarCandidatosPorEmpleo = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarCandidatosPorEmpleo(body);
    return res.json(respLog);
}

exports.listarPreguntasPorEmpleo = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarPreguntasPorEmpleo(body);
    return res.json(respLog);
}

exports.listarEmpleosPorReclutador = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarEmpleosPorReclutador(body);
    return res.json(respLog);
}

exports.listarCandidatosPorEmpleoChat = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarCandidatosPorEmpleoChat(body);
    return res.json(respLog);
}

exports.listarEmpleosPorId = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.listarEmpleosPorId(body);
    return res.json(respLog);
}

exports.rechazarCandidato = async function (req,res) {
    const body = req.body;
    const respLog = await empleosService.rechazarCandidato(body);
    return res.json(respLog);
}
