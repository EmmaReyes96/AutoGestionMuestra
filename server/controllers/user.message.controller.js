const nodemailer = require("nodemailer");

module.exports.messange = async (req, res) => {

    const {name, affair, email, message} = req.body;
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '', // generated ethereal user
            pass: '', // generated ethereal password
        },
    });

    // send mail with defined transport object
    const MailOptions = {
        from: 'Autogestion P.A.', // sender address
        to: "", // list of receivers
        subject: "AutoGestion P.A ✔", // Subject line
        html: `
        <h1> ${affair} </h1><h3> ${name} </h3><h3> ${email} </h3><p> ${message} </p>
        `, // html body
    };

    await transporter.sendMail( MailOptions, (err, info) =>{
        if(err){
            res.status(500).json({
                ok: false,
                msg:'error mailer'
            })
        }else{
            res.json({
                ok: true
            })
        }
    });

}