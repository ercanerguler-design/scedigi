import nodemailer from 'nodemailer'

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html
      })
      return { success: true, messageId: info.messageId }
    } catch (error) {
      console.error('Email send error:', error)
      throw error
    }
  }

  async sendCampaignEmail(to: string[], subject: string, html: string) {
    const results = []
    
    for (const recipient of to) {
      try {
        const result = await this.sendEmail(recipient, subject, html)
        results.push({ email: recipient, ...result })
      } catch (error) {
        results.push({ email: recipient, success: false, error })
      }
    }
    
    return results
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = `
      <h1>Hoşgeldiniz ${name}!</h1>
      <p>SCE Digital Platform'a katıldığınız için teşekkürler.</p>
      <p>Hemen başlamak için <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">buraya tıklayın</a>.</p>
    `
    return this.sendEmail(to, 'SCE Digital\'e Hoşgeldiniz', html)
  }
}
