import axios from 'axios'

export class LinkedInAPI {
  private accessToken: string
  private apiBase = 'https://api.linkedin.com/v2'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async sharePost(content: string, visibility: 'PUBLIC' | 'CONNECTIONS' = 'PUBLIC') {
    try {
      // LinkedIn Share API - UGC Posts
      const response = await axios.post(
        `${this.apiBase}/ugcPosts`,
        {
          author: `urn:li:person:{PERSON_ID}`, // LinkedIn Person/Organization ID
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: {
                text: content
              },
              shareMediaCategory: 'NONE'
            }
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': visibility
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      )

      return response.data
    } catch (error: any) {
      console.error('LinkedIn API error:', error.response?.data || error.message)
      throw error
    }
  }

  async getUserProfile() {
    try {
      const response = await axios.get(`${this.apiBase}/me`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })
      return response.data
    } catch (error) {
      console.error('LinkedIn profile error:', error)
      throw error
    }
  }
}
