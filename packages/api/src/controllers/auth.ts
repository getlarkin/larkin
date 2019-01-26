import * as express from 'express'
import * as passport from 'passport'
import { sign } from 'jsonwebtoken'
import { getRandomStringLong } from '@larkin/api/helpers/getRandomString'
import { User } from '@larkin/api/models/User'
import { requireAuth } from '@larkin/api/middleware/auth'

export const router = express.Router()

router.get('/me', requireAuth, (req, res) => {
  res.send(req.user)
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.post('/github', passport.authenticate('github'), async (req, res) => {
  const { id } = req.user
  res.send(sign({ id }, process.env.JWT_SECRET as string))
})

router.post('/api_tokens', requireAuth, async (req, res) => {
  const api_token = getRandomStringLong() + getRandomStringLong()
  const user = await User.query().updateAndFetchById(req.user.id, {
    api_token,
  })
  res.send(user)
})
