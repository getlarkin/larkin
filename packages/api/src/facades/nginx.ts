import * as fs from 'fs'
import * as cp from 'child_process'
import { isProduction } from '@larkin/api/helpers/environ'
import { logStdout } from '@larkin/api/services/logger'

export const createNewNginxConfig = (serverName: string, localPort: number) =>
  new Promise(resolve => {
    const newConfig = `
      server {
          server_name ${serverName};
          listen 8080;
          location / {
              proxy_pass http://localhost:${localPort};
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
    `
    const confDir = `${process.env.NGINX_CONF_FILE_DIR}/${serverName}.conf`
    fs.writeFile(confDir, newConfig, 'utf8', err => {
      if (err) {
        console.error(err)
        throw new Error('cannot write nginx config')
      }
      resolve()
    })
  })

export const restartNginx = () => {
  if (!isProduction) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    const ps = cp.spawn('sudo', ['systemctl', 'reload', 'nginx'])
    ps.on('exit', resolve)
  })
}

export const runCertbot = (domain: string) => {
  if (!isProduction) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    const ps = cp.spawn('sudo', [
      'certbot',
      'certonly',
      '--standalone',
      '-d',
      domain,
      '--email',
      'ketsume0211@gmail.com',
      '--agree-tos',
      '--keep-until-expiring',
      '--non-interactive',
    ])
    ps.stdout.on('data', logStdout)
    ps.on('exit', resolve)
  })
}
