const auroraPool = require("../config/db/auroraConnection");

exports.login = async function (query) {
  try {
    const SP_PARAMETERS = [query.correo, query.clave];
    const SP_QUERY = "CALL sp_s_login(?,?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    if (affectedRows.length > 0) {
      return {
        estado: true,
        data: affectedRows,
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

exports.existeLogin = async function (query) {
  try {
    const SP_PARAMETERS = [query.correo];
    const SP_QUERY = "CALL sp_s_existe_login(?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    if (affectedRows.length > 0) {
      return {
        estado: true,
        data: affectedRows,
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

exports.registrarUsuario = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.correo,
      query.nombreEmpresa, // username, autogenerado
      query.nombreCompleto, // nombres
      "", // apellido
      query.celular,
      "", //direccion
      "", //localidad ciudad y pais
      0,//idempresa
      query.clave,
      query.icono,
      query.typeLogin, //sistema:google:linkedIn
    ];
    const SP_QUERY = "CALL sp_i_recruiter(?,?,?,?,?,?,?,?,?,?,?);";
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

exports.validarRegistroUsuario = async function (query) {
  try {
    const SP_PARAMETERS = [query.correo, query.clave];

    const SP_QUERY = "CALL sp_s_validar_reg_usu(?,?);";
    const [affectedRows] = await auroraPool.queryAsync(SP_QUERY, SP_PARAMETERS);
    if (affectedRows.length > 0) {
      return {
        estado: true,
        data: affectedRows,
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

exports.actualizarEstadoUsuario = async function (query) {
  try {
    const SP_PARAMETERS = [query.correo];
    const SP_QUERY = "CALL sp_u_estado_usuario(?);";
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

exports.actualizarDatosReclutador = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.idReclutador,
      query.correo,
      query.nombreUsuario,
      query.nombres,
      query.apellidos,
      query.celular,
      query.direccion,
      query.ubicacion,
      query.icon,
    ];
    const SP_QUERY = "CALL sp_u_recruiter(?,?,?,?,?,?,?,?,?);";
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

exports.listarReclutadorPorId = async function (query) {
  try {
    const SP_PARAMETERS = [query.idRecruiter];

    const SP_QUERY = "CALL sp_s_recruiter_byuser(?);";
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

exports.actualizarPwdReclutador = async function (query) {
  try {
    const SP_PARAMETERS = [
      query.idReclutador,
      query.passwordActual,
      query.passwordNuevo,
    ];
    const SP_QUERY = "CALL sp_u_recruiter_pwd(?,?,?);";
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

exports.listarReclutadorPorEmail = async function (email) {
  try {
    const SP_PARAMETERS = [email];

    const SP_QUERY = "CALL sp_s_getRecruiter_by_email(?);";
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