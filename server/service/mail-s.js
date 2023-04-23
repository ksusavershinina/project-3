const nodemailer = require('nodemailer')

class MailService {
    /*constructor() {
        this.trasporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMTP_PASSWORD
            }

        })
    }*/
    async sendActivationMail(email, link) {
        /*await this.trasporter.sendMail({
            from: process.env.SMPT_USER,
            email,
            subject: 'Активация аккаунта на сайте' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                    <h1>Для активация акаунта нажми туды</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
    }*/
    }
}

module.exports = new MailService()