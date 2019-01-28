import * as fs from 'fs'
import * as cp from 'child_process'
import { isProduction } from '@larkin/api/helpers/environ'
import { logStdout } from '@larkin/api/services/logger'

interface NginxConfig {
  publicHostName: string
  proxyPort: number
  listenPort: number
  ssl?: boolean
}

export const createNewNginxConfig = (config: NginxConfig) =>
  new Promise(resolve => {
    const sslConfig = config.ssl
      ? `
          # SSL
          ssl_certificate /etc/letsencrypt/live/${config.publicHostName}/fullchain.pem;
          ssl_certificate_key /etc/letsencrypt/live/${config.publicHostName}/privkey.pem;

          # Recommendations from https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
          ssl_protocols TLSv1.1 TLSv1.2;
          ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
          ssl_prefer_server_ciphers on;
          ssl_session_cache shared:SSL:10m;
          `
      : ''

    const newConfig = `
      server {
          server_name ${config.publicHostName};
          listen ${config.listenPort}${config.ssl ? ' ssl' : ''};

          ${sslConfig}

          location / {
              proxy_pass http://localhost:${config.proxyPort};
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
    `
    const confDir = `${process.env.NGINX_CONF_FILE_DIR}/${config.publicHostName}.conf`
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

  return new Promise((resolve, reject) => {
    const ps = cp.spawn('sudo', [
      'certbot',
      'certonly',
      '--nginx',
      '-d',
      domain,
      '--email',
      'ketsume0211@gmail.com',
      '--agree-tos',
      '--keep-until-expiring',
      '--non-interactive',
    ])
    ps.stdout.on('data', logStdout)
    ps.stderr.on('data', logStdout)
    ps.on('close', code => {
      if (code !== 0) {
        reject(code)
      } else {
        resolve()
      }
    })
  })
}
