const Datefun = require("./utils/date");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (app) => {

  const port = process.env.node_port || 3000;
  
  app.listen(port, "0.0.0.0", () => {
    console.log("Laboral backend listening on port " + port);
  });

  app.on("uncaughtException", (req, res, err, cb) => {
    const errResponse = err;
    errResponse.toString = function toString() {
      return "an internal server error occurred!";
    };
    errResponse.toJSON = function toJSON() {
      return {
        message: "an uncaughtException server error occurred!",
        code: "500",
      };
    };

    return cb;
  });

  app.get("/status", function (req, res, cb) {
    var response = {
      status: 200,
      msg: "ok",
      hhmmss: Datefun.getNowByFormat("HHmmss"),
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
    console.log(
      "[ METHOD: " +
        req.method +
        " -- " +
        "PATH: " +
        req.href() +
        " -- " +
        "STATUS: " +
        res.statusCode +
        " ]"
    );
  });
};
