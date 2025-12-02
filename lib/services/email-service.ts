import { Resend } from 'resend'

export class EmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'SCE Digital <noreply@scedigital.com>',
        to: [to],
        subject,
        html
      })
      
      if (error) {
        console.error('Email send error:', error)
        throw error
      }
      
      return { success: true, messageId: data?.id }
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
