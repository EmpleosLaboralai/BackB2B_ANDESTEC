const chatRepository = require("../repositories/chatRepository");

exports.listarChatPorReclutadorCandidato = async function (body) {
    const respLog = await chatRepository.listarChatPorReclutadorCandidato(body);
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

exports.registrarChat = async function (body) {
  const respLog = await chatRepository.registrarChat(body);
  if (!respLog.estado) {
    console.log("[ERROR 1]", respLog.error);
    const resp = {
      codigoRespuesta: "99",
      error: "error interno",
    };
    return resp;
  }

  const respOk = {
    codigoRespuesta: "00",
    data: "chat registrado",
  };

  return respOk;
};
