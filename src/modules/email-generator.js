const nodemailer = require("nodemailer")

class EmailGenerator {

  constructor({
    host = 'smtp.exmail.qq.com',
    port = 465,
    secure = true,
    user = '',
    pass = ''
  }) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    })
    this.user = user
  }

  /**
   * @param {Array<Object>} attachments
   * @returns 
   */
  createContent({
    from = this.user,
    subject = '',
    text = '',
    html = '',
    attachments = [],
  }) {
    return {
      from,
      subject,
      text,
      html,
      attachments,
    }
  }

  send(content = {}, to = []) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        to: Array.isArray(to) ? to.join() : to,
        ...content,
      }, (err, info) => {
        if (err) {
          reject(err)
        }
        resolve(info)
      })
    })
  }
}

module.exports = EmailGenerator