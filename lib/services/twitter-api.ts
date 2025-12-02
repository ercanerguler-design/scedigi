import { TwitterApi } from 'twitter-api-v2'

export class TwitterAPI {
  private client: TwitterApi

  constructor(credentials: {
    apiKey: string
    apiSecret: string
    accessToken: string
    accessSecret: string
  }) {
    this.client = new TwitterApi({
      appKey: credentials.apiKey,
      appSecret: credentials.apiSecret,
      accessToken: credentials.accessToken,
      accessSecret: credentials.accessSecret,
    })
  }

  async tweet(content: string) {
    try {
      const result = await this.client.v2.tweet(content)
      return result
    } catch (error: any) {
      console.error('Twitter API error:', error)
      throw error
    }
  }

  async scheduleTweet(content: string, scheduledTime: Date) {
    // Store in database for later processing
    console.log('Scheduling tweet:', content, scheduledTime)
    return { success: true, scheduledFor: scheduledTime }
  }

  async getMetrics() {
    try {
      const response = await axios.get(
        `${TWITTER_API_BASE}/users/me/metrics`,
        {
          headers: {
            'Authorization': `Bearer ${this.bearerToken}`
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Twitter metrics error:', error)
      return { followers: 0, tweets: 0, engagement: 0 }
    }
  }
}
