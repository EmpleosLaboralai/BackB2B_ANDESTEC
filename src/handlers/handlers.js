const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

const register = (req, res) => {
  const { username, password, nombre } = req.body;

  // validamos datos
  if (username == "" || password == "" || nombre == "") {
    return res.status(401).end();
  }

  // registramos el usuario
  //  myFuncion.registrarUsuario(username, password, nombre);

  // devolvemos el token
  const resp = {
    estado: "ok",
    msg: "usuario registrado",
  };

  res.json(resp);
};

const login = (req, res) => {
  const { username, password } = req.body;

  // validamos datos
  if (username == "" || password == "") {
    return res.status(401).end();
  }

  //generamos el token
  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);

  // devolvemos el token
  const resp = {
    token,
  };
  res.json(resp);
};

const refresh = (req, res) => {
  const token = req.headers.token;
  console.log("token:::", token);
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log("payload::", payload);
  } catch (e) {
    console.log("error refresh", e);
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end();
  }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  // devolvemos el nuevo token
  const resp = {
    token: newToken,
  };
  res.json(resp);
};

const validarToken = (req, res, next) => {
  console.log("valida token Time:", Date.now());
  console.log("authorization:::", req.headers.authorization);

  if (req.originalUrl == "/register") {
    next();
    return;
  }

  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Tu petición no tiene cabecera de autorización" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // const token = req.headers.token;
  console.log("token:::", token);
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log("payload::", payload);
  } catch (e) {
    console.log(e);
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
    return res.status(400).end();
  }

  next();
};

module.exports = {
  login,
  refresh,
  register,
  validarToken,
};
