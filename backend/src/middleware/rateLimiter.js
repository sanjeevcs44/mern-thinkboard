import ratelimit from '../config/upstash.js'

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit('api')
    if (!success) {
      return res.status(429).json({ message: 'Too Many Requests' })
    }
    next()
  } catch (error) {
    res.status(429).json({ message: 'Too Many Requests' })
  }
}
export default rateLimiterMiddleware
// This middleware function is used to limit the number of requests a user can make to the server.
