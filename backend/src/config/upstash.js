import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'
dotenv.config() // Load environment variables from .env file
// This file is used to configure Upstash Redis and Ratelimit for the application.
const ratelimit = new Ratelimit({
  // Create a new Ratelimit instance
  redis: Redis.fromEnv(), // Use Redis from environment variables
  // Configure the rate limiter with a sliding window of 10 requests per 10 seconds
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

export default ratelimit
