const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:'smtp.mail.ru',
            port: 465,
            auth: {
                user: 'timenkosss@mail.ru',
                pass: 'AzyJrnqBFfxub1MjEBB5'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
                from: 'timenkosss@mail.ru',
                to,
                subject: 'Активация аккаунта на сайте ' + process.env.API_URL,
                text: '',
                html:
                    `
                    <div>   
                        <a href="${link}">${link}</a>
                    </div>
                    `
            })
    }
}


module.exports = new MailService()