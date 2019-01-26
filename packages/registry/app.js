const app = require('express')()
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const winston = require('winston')
const expressWinston = require('express-winston')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  expressWinston.logger({
    level: 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
  }),
)

app.use((req, res, next) => {
  console.log(req.body.user)
  console.log(req.body.password)
  next()
})

const register = (user, password) =>
  new Promise(resolve => {
    const ps = exec(`echo ${password} | sudo htpasswd -i -c /etc/nginx/nginx.htpasswd ${user}`)
    ps.on('exit', resolve)
  })

app.post('/register', async (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.send('ok')
    return
  }
  await register(req.body.user, req.body.password)
  res.send('ok')
})

app.listen(28642, () => {
  console.log('Register server is running at: http://localhost:28642')
})
