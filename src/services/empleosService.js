const empleosRepo = require("../repositories/empleosRepository");
const mailService = require("./mailService");

exports.listarEmpleosPorIdUser = async function (body) {
  const respLog = await empleosRepo.listarEmpleosPorIdUsuario(body);
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
    data: respLog.data,
  };
  return respOk;
};

exports.registrarEmpleo = async function (body) {
  body.job_offer_link = process.env.url_empleo;
  const respLog = await empleosRepo.registrarEmpleo(body);
  console.log('==>',respLog.data[0].l_account_id);
  if (!respLog.estado) {
    console.log("[ERROR 1]", respLog.error);
    const resp = {
      codigoRespuesta: "99",
      error: "error interno",
    };
    return resp;
  }


  body.idb2b = respLog.data[0].l_account_id;
  const respLog2 = await empleosRepo.registrarEmpleob2c(body);
  if (!respLog2.estado) {
    console.log("[ERROR 2]", respLog2.error);
    const resp = {
      codigoRespuesta: "99",
      error: "error interno",
    };
    return resp;
  }

  const objDatos = {    
    correo: body.correo,
    nombre: body.nombre,
    tituloPuesto: body.job_title
  };
   mailService.enviarCorreoRegEmpleo(objDatos);

  const respOk = {
    codigoRespuesta: "00",
    data: "empleo registrado",
  };

  return respOk;
};

exports.listarEmpleosOpenClose = async function (body) {
  const resp = await empleosRepo.listarEmpleosOpenClose(body);
  if (!resp.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: resp.error,
    };
    return resp;
  }
  const respOk = {
    codigoRespuesta: "00",
    hasData: resp.data.length > 0 ? true : false,
    data: resp.data,
  };
  return respOk;
};

exports.eliminarEmpleoPorId = async function (body) {
  var respDB = [];
  body.ids.forEach(async (idJob) => {
    const respLog = await empleosRepo.eliminarEmpleoPorId(idJob);
    await empleosRepo.eliminarEmpleoPorIdB2C(idJob);
    respDB.push(respLog.estado);
    if (!respLog.estado) {
      console.log("[ERROR]", respLog.error);
    }
  });

  const respOk = {
    codigoRespuesta: "00",
    data: "empleo(s) elimiando(s)",
    respDB,
  };

  return respOk;
};

exports.listarCandidatosPorEmpleo = async function (body) {
  const resp = await empleosRepo.listarCandidatosPorEmpleo(body);
  if (!resp.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: resp.error,
    };
    return resp;
  }
  const respOk = {
    codigoRespuesta: "00",
    hasData: resp.data.length > 0 ? true : false,
    data: resp.data,
  };
  return respOk;
};

exports.listarPreguntasPorEmpleo = async function (body) {
  const resp = await empleosRepo.listarPreguntasPorEmpleo(body);
  if (!resp.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: resp.error,
    };
    return resp;
  }
  const respOk = {
    codigoRespuesta: "00",
    hasData: resp.data.length > 0 ? true : false,
    data: resp.data,
  };
  return respOk;
};

exports.listarEmpleosPorReclutador = async function (body) {
  const respLog = await empleosRepo.listarEmpleosPorReclutador(body);
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
    data: respLog.data,
  };
  return respOk;
};

exports.listarCandidatosPorEmpleoChat = async function (body) {
  const resp = await empleosRepo.listarCandidatosPorEmpleoChat(body);
  if (!resp.estado) {
    const resp = {
      codigoRespuesta: "99",
      error: resp.error,
    };
    return resp;
  }
  const respOk = {
    codigoRespuesta: "00",
    hasData: resp.data.length > 0 ? true : false,
    data: resp.data,
  };
  return respOk;
};

exports.listarEmpleosPorId = async function (body) {
  const respLog = await empleosRepo.listarEmpleosPorId(body);
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
    data: respLog.data[0],
  };
  return respOk;
};

exports.rechazarCandidato = async function (body) {
  const respLog = await empleosRepo.rechazarCandidato(body);
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
    data: respLog.data[0],
  };
  return respOk;
};