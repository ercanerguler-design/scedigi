import axios from 'axios'

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v18.0'

export class WhatsAppAPI {
  private accessToken: string
  private phoneNumberId: string

  constructor(accessToken: string, phoneNumberId: string) {
    this.accessToken = accessToken
    this.phoneNumberId = phoneNumberId
  }

  async sendMessage(to: string, message: string) {
    try {
      const response = await axios.post(
        `${WHATSAPP_API_BASE}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: message }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('WhatsApp API error:', error)
      throw error
    }
  }

  async sendTemplate(to: string, templateName: string, parameters: string[]) {
    try {
      const response = await axios.post(
        `${WHATSAPP_API_BASE}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'tr' },
            components: [
              {
                type: 'body',
                parameters: parameters.map(p => ({ type: 'text', text: p }))
              }
            ]
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('WhatsApp template error:', error)
      throw error
    }
  }

  async sendMedia(to: string, mediaUrl: string, type: 'image' | 'video' | 'document') {
    try {
      const response = await axios.post(
        `${WHATSAPP_API_BASE}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: to,
          type: type,
          [type]: { link: mediaUrl }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('WhatsApp media error:', error)
      throw error
    }
  }
}
