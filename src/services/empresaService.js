const empresaRepo = require("../repositories/empresaRepository");
const mailService = require("./mailService");

exports.registrarEmpresa = async function (body) {
  const query = {
    ruc: body.ruc,
    name: body.name,
    icon: body.icon,
    rating: body.rating,
    location: body.location,
    linkedin: body.linkedin,
    webpage: body.webpage,
    endorse: body.endorse,
    about: body.about,
    idUser: body.idUser,
  };

  const respLog = await empresaRepo.registrarEmpresa(query);
  if (!respLog.estado) {
    console.log("[ERROR]", respLog.error);
    const resp = {
      codigoRespuesta: "99",
      error: "error interno",
    };
    return resp;
  }

  if (body.correo.length > 0) {
    const objDatos = {
      correo: body.correo,
      nombre: body.nombre,
      nombreEmpresa: body.name,
    };
    mailService.enviarCorreoRegEmpresa(objDatos);
  }

  const respOk = {
    codigoRespuesta: "00",
    data: "empresa registrada",
  };

  return respOk;
};

exports.listarEmpresaPorIdUser = async function (body) {
  const respLog = await empresaRepo.listarEmpresaPorIdUsuario(body);
  if (!respLog.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: respLog.error,
    };
    return resp;
  }
  const respOk = {
    codigoRespuesta: "00",
    hasData: respLog.data.length > 0 ? true : false,
    data: respLog.data.length > 0 ? respLog.data[0] : {},
  };
  return respOk;
};
