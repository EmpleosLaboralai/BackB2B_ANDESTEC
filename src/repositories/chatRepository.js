const auroraPool = require("../config/db/auroraConnection");
exports.registrarChat = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.idReclutador,
      query.idCandidato,
      query.idEmpleo,
      query.idCab,
      query.mensaje,
      query.participante,
    ];
    const SP_QUERY = "CALL sp_i_chat_candidates(?,?,?,?,?,?);";
    const respdb = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    if (respdb.affectedRows > 0) {
      return {
        estado: true,
        data: [],
      };
    } else {
      return {
        estado: false,
        data: [],
      };
    }
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};

exports.listarChatPorReclutadorCandidato = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.idReclutador,
      query.idCandidato,
      query.idEmpleo,
    ];
    const SP_QUERY = "CALL sp_s_chat_candidates(?,?,?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    return {
      estado: true,
      data: affectedRows,
    };
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};
