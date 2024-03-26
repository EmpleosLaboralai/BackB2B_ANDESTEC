const jwt = require("jsonwebtoken");


const validarToken = (req, res, next) => {
    console.log("valida token Time:", Date.now());
    console.log("authorization:::", req.headers.authorization);
  
    if (req.originalUrl == "/register" || req.originalUrl == "/login" || req.originalUrl == "/validateTokenGoogle" 
    || req.originalUrl == "/validateTokenLinkedin" || req.originalUrl == "/getJobsById"
    || req.originalUrl == "/validateExistsUser"
    || req.originalUrl == "/registerUser"
    ) {
      next();
      return;
    }
  
    if (!req.headers.authorization) {
      return res
        .status(403)
        .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
  
    const token = req.headers.authorization.split(" ")[1];    
    console.log("token:::", token);


    if (!token) {
      return res.status(401).end();
    }
  
    var payload;
    try {

      jwtKey = process.env.jwtkey, 

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
    validarToken,
  };
  