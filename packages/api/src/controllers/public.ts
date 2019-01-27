import * as express from 'express'
import { User } from '@larkin/api/models/User'
import axios from 'axios'
import { getRandomStringLong } from '@larkin/api/helpers/getRandomString'

export const router = express.Router()

router.get('/get_docker_login', async (req, res) => {
  const api_token = req.headers['x-token']
  const user = await User.query().findOne({ api_token })
  if (!user) {
    res.status(401).send('api token is wrong')
    return
  }
  const password =
    getRandomStringLong() + getRandomStringLong() + getRandomStringLong() + getRandomStringLong()

  await axios.post(`${process.env.REGISTRY_API_URL}/register`, {
    user: api_token,
    password,
  })

  res.send(`docker login -u ${api_token} -p ${password} ${process.env.DOCKER_LOGIN_URL}`)
})
