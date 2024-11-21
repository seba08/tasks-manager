import nodemailer from "nodemailer";


//Crear el transporter

const transporter  = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: "sgrx245@gmail.com",
        pass: 'ygyh bkyn xemb cpms'
    }
});


const sendMail = async (to, subject, text, html) => {
    const mailOptions ={
        from: "sgrx245@gmail.com",
        to,
        subject,
        text, 
        html
    }

    await transporter.sendMail(mailOptions)
}


export default sendMail;