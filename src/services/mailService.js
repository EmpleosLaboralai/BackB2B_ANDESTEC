const nodemailer = require("nodemailer");
const usuarioMailer = process.env.mailer_user;

const transporter2 = nodemailer.createTransport({
  service: "Gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    user: usuarioMailer,
    pass: process.env.mailer_password,
  },
});


exports.enviarCorreo = async function (objDatos) {
  var message = {
    from: "Aviso de registro laboral.ai <"+usuarioMailer+">",
    to: objDatos.correo,
    subject: "Aviso de registro laboral.ai",
    text: "Url de validacion: " + objDatos.url,
    html: `<html><body>
    <p>
          Hola ${objDatos.nombreCompleto},</p>

          <p>¡Bienvenido a LABORAL.AI para empresas!</p>

          <p>Estamos emocionados de confirmar que tu registro ha sido recibido con éxito. Para completar el proceso y activar tu cuenta, por favor haz clic en el siguiente enlace de confirmación:</p>

          <p>[${objDatos.url}]</p>

          <p>Una vez que hayas hecho clic en el enlace, tendrás acceso inmediato a una variedad de beneficios y servicios diseñados para optimizar tus procesos laborales y potenciar el rendimiento de tu empresa.</p>

          Atentamente,<br>
          El equipo Laboral.AI
    </body></html>`
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};

exports.enviarCorreoRegEmpresa = async function (objDatos) {
  var message = {
    from: "Aviso de confirmación laboral.ai <"+usuarioMailer+">",
    to: objDatos.correo,
    bcc: 'info@laboral.ai,empleoslaboral.ai@gmail.com',
    subject: "Correo de confirmación de Perfil Empresa",
    text: "Correo de confirmación de Perfil Empresa",
    html: `<html><body>
          <p>  
            Estimado/a ${objDatos.nombre},
          </p>
          <p>  
          ¡Bienvenido/a a LABORAL.AI! 
          </p>

          <p>
           Este correo es para confirmar que la cuenta de empresa para <b> ${objDatos.nombreEmpresa} </b>
           ha sido creada exitosamente en LABORAL.AI. Ahora tiene acceso completo a todas las 
           funciones y herramientas que ofrecemos para simplificar el proceso de contratación 
           y optimizar la búsqueda de talento.
          </p>
          <p>
          Por favor, acceda a su cuenta utilizando las credenciales proporcionadas durante el registro 
          y comience a aprovechar todas las ventajas que 
          <a href='https://gentle-moss-01a23fa10.4.azurestaticapps.net/'> LABORAL.AI  </a>
          tiene para ofrecer.
          </p>

          <p>
            Gracias por confiar en nosotros para sus necesidades de reclutamiento. 
            Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en 
            contacto con nuestro equipo de soporte.
          </p>

          Atentamente,<br>
          El equipo Laboral.AI
    </body></html>`
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};

exports.enviarCorreoRegEmpleo = async function (objDatos) {
  var message = {
    from: "Aviso de publicación laboral.ai <"+usuarioMailer+">",    
    to: objDatos.correo,
    bcc: 'info@laboral.ai,empleoslaboral.ai@gmail.com',
    subject: "Correo de confirmación Publicación de Empleo",
    text: "Correo de confirmación Publicación de Empleo",
    html: `<html><body>
          <p>  
            Estimado/a ${objDatos.nombre},
          </p>

          <p>
            Es un placer confirmar que la oferta de empleo para 
            ${objDatos.tituloPuesto} ha sido publicada con éxito en LABORAL.AI. 
            Su oportunidad laboral ahora está disponible para ser vista 
            por nuestra red de talentos y profesionales cualificados.
          </p>

          <p>
            Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto
            con nuestro equipo de soporte al 988 248 204 (enlace a wsp).
          </p>

          Atentamente,<br>
          El equipo Laboral.AI
    </body></html>`
  };

  const info = await transporter2.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};

exports.testEnviarCorreo = async function (objDatos) {
  var message = {
    from: "Aviso de registro laboral.ai <"+usuarioMailer+">",
    to: objDatos.correo,
    subject: "Aviso de registro laboral.ai",
    text: "Url de validacion: " + objDatos.url,
    html: `<html><body>
    <p>
    Hola ${objDatos.nombreCompleto},</p>

    <p>¡Bienvenido a LABORAL.AI para empresas!</p>

    <p>Estamos emocionados de confirmar que tu registro ha sido recibido con éxito. Para completar el proceso y activar tu cuenta, por favor haz clic en el siguiente enlace de confirmación:</p>

    <p>[${objDatos.url}]</p>

    <p>Una vez que hayas hecho clic en el enlace, tendrás acceso inmediato a una variedad de beneficios y servicios diseñados para optimizar tus procesos laborales y potenciar el rendimiento de tu empresa.</p>

    Atentamente,<br>
    El equipo Laboral.AI
    </body></html>`
  };

  const info = await transporter2.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};