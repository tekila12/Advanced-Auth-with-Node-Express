const nodemailer = require('nodemailer')

const sendEmal = (options) =>{

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,

        }
    })
}