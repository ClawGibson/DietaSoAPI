const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "nutriplay.game@gmail.com",
        pass: "usqwddlhvmolhqhu",
    },
});

const sendEmail = async(name, email, token, subject) => {
    try {

        await transporter.sendMail({
            from: `DietaSO`,
            to: email,
            subject,
            html: `
            <p>Hola ${name} porfavor da clic en el siguiente link para verificar tu cuenta</p>
            <a href="http://localhost:4000/api/v2/usuarios/verificar-email?token=${token}">Clic aqui para verificar</a>
            `,
        });

    } catch (error) {
        console.log('Algo anda mal', error)
    }

    console.log("Mensaje enviado");
}

module.exports = {
    sendEmail
}