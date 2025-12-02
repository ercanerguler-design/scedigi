import { TwitterApi } from 'twitter-api-v2'

const TWITTER_API_BASE = 'https://api.twitter.com/2'

export class TwitterAPI {
  private client: TwitterApi
  private bearerToken?: string

  constructor(credentials: {
    apiKey: string
    apiSecret: string
    accessToken: string
    accessSecret: string
    bearerToken?: string
  }) {
    this.client = new TwitterApi({
      appKey: credentials.apiKey,
      appSecret: credentials.apiSecret,
      accessToken: credentials.accessToken,
      accessSecret: credentials.accessSecret,
    })
    this.bearerToken = credentials.bearerToken
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
      // Use Twitter API v2 to get user metrics
      const me = await this.client.v2.me()
      return {
        followers: 0, // Would need additional API call
        tweets: 0,
        engagement: 0,
        username: me.data.username
      }
    } catch (error) {
      console.error('Twitter metrics error:', error)
      return { followers: 0, tweets: 0, engagement: 0 }
    }
  }
}
