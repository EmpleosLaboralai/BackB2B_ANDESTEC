const usuarioService = require("../services/usuarioService");
const tokenService = require("../services/tokenService");
const fs = require("fs");

exports.login = async function (req, res) {
  const body = req.body;
  const respLog = await usuarioService.login(body);
  return res.json(respLog);
};

exports.validaTokenLinkedin = async function (req, res) {
  const body = req.body;

  const respValidacion = await usuarioService.validarTokenLinkedin(body.token);
  if (respValidacion.codigoRespuesta != "00") {
    return res.json(respValidacion);
  }

  const respDataInfoUser = await usuarioService.obtenerDataInfoLinkedin(
    respValidacion.dataToken.access_token
  );
  if (respDataInfoUser.codigoRespuesta != "00") {
    return res.json(respDataInfoUser);
  }

  var respDataReclutador = await usuarioService.listarReclutadorPorEmail(
    respDataInfoUser.dataUser.email
  );
  if (!respDataReclutador.hasData) {
    // registamos usuario en BD
    const reqUsu = {
      correo: respDataInfoUser.dataUser.email,
      clave: respDataInfoUser.dataUser.email,
      nombreCompleto: respDataInfoUser.dataUser.name,
      nombreEmpresa: respDataInfoUser.dataUser.name,
      celular: "000-000-000",
      icono: respDataInfoUser.dataUser.picture,
      typeLogin: "linkedin",
    };
    const respRegUsu = await usuarioService.registrarUsuario(reqUsu);
    if (respRegUsu.codigoRespuesta != "00") {
      return respRegUsu;
    }

    respDataReclutador = await usuarioService.listarReclutadorPorEmail(
      respDataInfoUser.dataUser.email
    );
  }

  // generamos jwt
  const token = tokenService.GenerarToken(respDataInfoUser.dataUser.email);

  // devolvemos la data de usuario OK
  return res.json({
    codigoRespuesta: "00",
    data: respDataReclutador.data,
    token,
  });
};

exports.validaTokenGoogle = async function (req, res) {
  const body = req.body;

  // validamos token google
  const respValidacion = await usuarioService.validarTokenGoogle(body.token);
  if (respValidacion.codigoRespuesta != "00") {
    return res.json(respValidacion);
  }

  //traemos data del reclutador por email
  var respdataReclu = await usuarioService.listarReclutadorPorEmail(
    respValidacion.user.email
  );
  if (!respdataReclu.hasData) {
    // registamos usuario en BD
    const reqUsu = {
      correo: respValidacion.user.email,
      clave: respValidacion.user.email,
      nombreCompleto: respValidacion.user.name,
      nombreEmpresa: respValidacion.user.name,
      celular: "000-000-000",
      icono: respValidacion.user.picture,
      typeLogin: "google",
    };
    const respRegUsu = await usuarioService.registrarUsuario(reqUsu);
    if (respRegUsu.codigoRespuesta != "00") {
      return respRegUsu;
    }
    respdataReclu = await usuarioService.listarReclutadorPorEmail(
      respValidacion.user.email
    );
  }

  // generamos jwt
  const token = tokenService.GenerarToken(respValidacion.user.email);

  // devolvemos la data de usuario OK
  return res.json({
    codigoRespuesta: "00",
    data: respdataReclu.data,
    token,
  });
};

exports.Existelogin = async function (req, res) {
  console.log("call Existelogin()");
  const body = req.body;
  const respLog = await usuarioService.existeLogin(body);
  return res.json(respLog);
};

exports.registrarUsuario = async function (req, res) {
  const body = req.body;
  const respLog = await usuarioService.registrarUsuario(body);
  return res.json(respLog);
};

exports.validaRegistroUsuario = async function (req, res) {
  const body = req.body;
  const respLog = await usuarioService.validaRegistroUsuario(body);
  return res.json(respLog);
};

exports.actualizarDatosReclutador = async function (req, res) {
  const body = JSON.parse(req.body.infoData);
  var fileName = "";
  console.log("req.files==>", req.files);
  if (req.files) {
    const { myFile } = req.files;
    fileName = "avatar" + new Date().getTime() + "." + myFile.name.split(".")[1];
    myFile.mv(process.cwd() + "/resources/static/uploads/" + fileName);

    try {
      fs.unlinkSync(process.cwd() + "/resources/static/uploads/" + body.icono);
      console.log("File deleted!");
    } catch (error) {
      console.log("error eliminado avatar anterior", error);
    }
  }

  body.icon = fileName;
  const respLog = await usuarioService.actualizarDatosReclutador(body);
  respLog.icono = fileName;
  return res.json(respLog);
};

exports.listarReclutadorPorId = async function (req, res) {
  const body = req.body;
  const respLog = await usuarioService.listarReclutadorPorId(body);
  return res.json(respLog);
};

exports.actualizarPwdReclutador = async function (req, res) {
  const body = req.body;
  const respLog = await usuarioService.actualizarPwdReclutador(body);
  return res.json(respLog);
};
