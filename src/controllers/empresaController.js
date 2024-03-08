const empresaService = require('../services/empresaService');

exports.registrarEmpresa = async function (req,res) {

    const body = JSON.parse(req.body.infoData);    
    var fileName = "";
    if (req.files) {
        const { myFile } = req.files;
        fileName ="logo" + body.ruc + "." + myFile.name.split(".")[1];    
        // myFile.mv(__dirname + "/upload/" + fileName);
        myFile.mv(process.cwd() + "/resources/static/uploads/" + fileName);
    }
    
    body.icon = fileName;
    const respLog = await empresaService.registrarEmpresa(body);       
    return res.json(respLog);
}


exports.listarEmpresaPorIdUser = async function (req,res) {
    const body = req.body;
    const respLog = await empresaService.listarEmpresaPorIdUser(body);
    return res.json(respLog);
}