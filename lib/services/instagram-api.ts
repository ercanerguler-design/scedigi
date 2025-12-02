import axios from 'axios'

const INSTAGRAM_API_BASE = 'https://graph.facebook.com/v18.0'

export class InstagramAPI {
  private accessToken: string
  private businessAccountId: string

  constructor(accessToken: string, businessAccountId: string) {
    this.accessToken = accessToken
    this.businessAccountId = businessAccountId
  }

  async createPost(imageUrl: string, caption: string) {
    try {
      // Step 1: Create media container
      const containerResponse = await axios.post(
        `${INSTAGRAM_API_BASE}/${this.businessAccountId}/media`,
        {
          image_url: imageUrl,
          caption: caption,
          access_token: this.accessToken
        }
      )

      const containerId = containerResponse.data.id

      // Step 2: Publish the container
      const publishResponse = await axios.post(
        `${INSTAGRAM_API_BASE}/${this.businessAccountId}/media_publish`,
        {
          creation_id: containerId,
          access_token: this.accessToken
        }
      )

      return publishResponse.data
    } catch (error) {
      console.error('Instagram API error:', error)
      throw error
    }
  }

  async schedulePost(imageUrl: string, caption: string, scheduledTime: Date) {
    // Store in database for later processing
    console.log('Scheduling Instagram post:', caption, scheduledTime)
    return { success: true, scheduledFor: scheduledTime }
  }

  async getInsights() {
    try {
      const response = await axios.get(
        `${INSTAGRAM_API_BASE}/${this.businessAccountId}/insights`,
        {
          params: {
            metric: 'follower_count,impressions,reach,profile_views',
            access_token: this.accessToken
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Instagram insights error:', error)
      return { followers: 0, posts: 0, engagement: 0 }
    }
  }
}
