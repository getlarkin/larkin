import axios from 'axios'

export const API_URL = process.env.API_URL || ''

export const subscribe = async (email: string) =>
  await fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    body: JSON.stringify({
      channel: 'notifications',
      text: `docker-run.com subscriber: ${email}`,
    }),
  })

const client = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const health = () => client.get('/health')

export const getMe = () => client.get('/auth/me')

export const loginWithGitHubToken = (token: string) => client.post(`/auth/github?code=${token}`)

export const loginWithJWTToken = () => client.get('/auth/me')

export const getContainers = () => client.get('/containers')

// interface LaunchContainerParams {
//   image: string
// }

export const launchContainer = (image: string) => client.post('/containers', { image })

export const destroyContainer = (id: string) => client.delete(`/containers/${id}`)
