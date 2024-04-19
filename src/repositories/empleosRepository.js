const auroraPool = require("../config/db/auroraConnection");
const auroraPool2 = require("../config/db/mysqlCnxb2c");

exports.listarEmpleosPorIdUsuario = async function (query) {
  try {
    const SP_PARAMETERS = [query.idUser];
    const SP_QUERY = "CALL sp_s_job_description(?);";
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

exports.registrarEmpleo = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.job_title,
      query.job_offer_link,
      query.company,
      query.req_qualifications,
      query.pref_qualifications,
      query.key_responsabilities,
      query.techskill_tool,
      query.language,
      query.knowledge,
      query.softskills,
      query.career_background,
      query.location,
      query.salary,
      query.date_entry,
      query.date_expiration,
      query.number_positions,
      query.status,
      query.nps,
      query.id_recruiter,
      query.modality,
    ];
    const SP_QUERY =
      "CALL sp_i_job_description(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    // const respdb = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
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

exports.registrarEmpleob2c = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.req_qualifications,
      query.id_recruiter,
      query.job_title,
      query.date_expiration,
      query.date_entry,
      query.modality,
      query.techskill_tool,
      query.location,
      "1",
      query.modality,
      query.idb2b
    ];
    const SP_QUERY = "CALL sp_i_job(?,?,?,?,?,?,?,?,?,?,?);";
    const respdb = await auroraPool2.queryAsync(SP_QUERY, SP_PARAMETERS);
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

exports.listarEmpleosOpenClose = async function (query) {
  try {
    const SP_PARAMETERS = [query.idReclutador, query.estado];
    const SP_QUERY = "CALL sp_s_jobs_open_close(?,?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    return {
      estado: true,
      data: affectedRows      
    };
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};

exports.eliminarEmpleoPorId = async function (idJob) {
  try {
    const SP_PARAMETERS = [idJob];
    const SP_QUERY =
      "CALL sp_d_job_byid(?);";
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

exports.eliminarEmpleoPorIdB2C = async function (idJob) {
  try {
    const SP_PARAMETERS = [idJob];
    const SP_QUERY =
      "CALL sp_d_job(?);";
    const respdb = await auroraPool2.queryAsync(SP_QUERY, SP_PARAMETERS);
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

exports.listarCandidatosPorEmpleo = async function (query) {
  try {
    const SP_PARAMETERS = [query.idJob];
    const SP_QUERY = "CALL sp_s_candidate_byjob(?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    return {
      estado: true,
      data: affectedRows      
    };
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};

exports.listarPreguntasPorEmpleo = async function (query) {
  try {
    const SP_PARAMETERS = [query.idJob];
    const SP_QUERY = "CALL sp_s_b2b_job_questions_byjob(?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    return {
      estado: true,
      data: affectedRows      
    };
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};

exports.listarEmpleosPorReclutador = async function (query) {
  try {
    const SP_PARAMETERS = [query.idRecruiter];
    const SP_QUERY = "CALL sp_s_job_description_chat(?);";
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

exports.listarCandidatosPorEmpleoChat = async function (query) {
  try {
    const SP_PARAMETERS = [query.idJob];
    const SP_QUERY = "CALL sp_s_candidate_byjob_chat(?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    return {
      estado: true,
      data: affectedRows      
    };
  } catch (error) {
    console.error(error);
    return {
      estado: false,
      error: error,
    };
  }
};

exports.listarEmpleosPorId = async function (query) {
  try {
    const SP_PARAMETERS = [query.idJob];
    const SP_QUERY = "CALL sp_s_job_description_by_id(?);";
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


exports.registrarEmpleoCopia = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.job_title,
      query.job_offer_link,
      query.company,
      query.req_qualifications,
      query.pref_qualifications,
      query.key_responsabilities,
      query.techskill_tool,
      query.language,
      query.knowledge,
      query.softskills,
      query.career_background,
      query.location,
      query.salary,
      query.date_entry,
      query.date_expiration,
      query.number_positions,
      query.status,
      query.nps,
      query.id_recruiter,
      query.modality,
    ];
    const SP_QUERY =
      "CALL sp_i_job_description(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
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



exports.rechazarCandidato = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.id_job_applicant,      
    ];
    const SP_QUERY =
      "CALL sp_u_job_applicant(?);";
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