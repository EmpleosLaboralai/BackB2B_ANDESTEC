const logSistemaRepository = require("../repositories/logSistemaRepository");

exports.getLogSistema = async function (body) {
  const query = {};
  const respLog = await logSistemaRepository.getLogSistema(query);
  if (!respLog.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: respLog.error,
    };
    return resp;
  }

  const respOk = {
    codigoRespuesta: "00",
    data: respLog.data,
  };

  return respOk;
};

exports.registerLogSistema = async function (body) {
  const query = {
    modulo: body.modulo,
    tipo: body.tipo,
    usuario: body.usuario,
    mensaje: body.mensaje,
  };
  const respLog = await logSistemaRepository.registerLogSistema(query);
  if (!respLog.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: respLog.error,
    };
    return resp;
  }

  const respOk = {
    codigoRespuesta: "00",
    data: 'log registrado',
  };

  return respOk;
};
