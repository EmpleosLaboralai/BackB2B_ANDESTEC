const logSistemaController = require("../controllers/logSistemaController");
// const {  login,  refresh,  register,  validarToken,} = require("../handlers/handlers");
const { validarToken } = require("../middleware/middlewareAuth");
const usuarioCtrl = require("../controllers/usuarioController");
const empresaCtrl = require("../controllers/empresaController");
const empleosCtrl = require("../controllers/empleosController");
const chatCtrl = require("../controllers/chatController");
const fileupload = require("express-fileupload");

module.exports = async function (app) {
  app.use(fileupload());
  
  app.use(validarToken);

  app.post("/login", usuarioCtrl.login);
  app.post("/registerUser", usuarioCtrl.registrarUsuario);
  app.post("/validateRegisterUser", usuarioCtrl.validaRegistroUsuario);
  app.post("/validateExistsUser", usuarioCtrl.Existelogin);
  app.post("/updateDataUser", usuarioCtrl.actualizarDatosReclutador);
  app.post("/registerCompany", empresaCtrl.registrarEmpresa);
  app.post("/getCompanyByIdUser", empresaCtrl.listarEmpresaPorIdUser);
  app.post("/registerJob", empleosCtrl.registrarEmpleos);
  app.post("/getJobsByIdUser", empleosCtrl.listarEmpleosPorUsuario);
  app.post("/getRecruiterById", usuarioCtrl.listarReclutadorPorId);
  app.post("/updatePasswordAccount", usuarioCtrl.actualizarPwdReclutador);
  app.post("/getJobsOpenClose", empleosCtrl.listarEmpleosopenClose);
  app.post("/deleteJobsByIds", empleosCtrl.eliminarEmpleoPorId);
  app.post("/getCandidatesByJob", empleosCtrl.listarCandidatosPorEmpleo);
  app.post("/getQuestionsByJob", empleosCtrl.listarPreguntasPorEmpleo);
  app.post("/getJobsByRecruiter", empleosCtrl.listarEmpleosPorReclutador);
  app.post("/getCandidatesByJobChat", empleosCtrl.listarCandidatosPorEmpleoChat);
  app.post("/registerChat", chatCtrl.registrarChat);
  app.post("/getChatsByRecruiterCandidate", chatCtrl.listarChatPorReclutadorCandidato);
  app.post("/getPublicJobsById", empleosCtrl.listarEmpleosPorId);

  app.post("/validateTokenGoogle", usuarioCtrl.validaTokenGoogle);
  app.post("/validateTokenLinkedin", usuarioCtrl.validaTokenLinkedin);

  app.get("/health", (req, res) => {  
    //  const testMail = require("../services/mailService");  
    //  const objDatos = {
    //   url:'www.pruebas.com/sdsdsd',
    //   correo : 'pacoyx@gmail.com',
    //   nombreCompleto : 'carlos bazan'
    // }
    //  testMail.testEnviarCorreo(objDatos);
    console.log('status api ok');
    return res.json({ status: "ok" });
  });

  // app.post("/getLogSistema", logSistemaController.getLogSistema);
  // app.post("/registerLogSistema", logSistemaController.registerLogSistema);
  // app.post("/registerTest", register);
  // app.post("/loginTest", login);
  // app.post("/refreshTest", refresh);

  // console.log(__dirname);
  // console.log(process.cwd() );
  // console.log(new Date().getTime() );
};
