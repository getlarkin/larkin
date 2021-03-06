require('dotenv').config()

const fs = require('fs')
const ejs = require('ejs')
const { spawn } = require('child_process')

async function clear() {
  return new Promise(resolve => {
    const ps = spawn('rm', ['-rf', 'provision_real'])
    ps.on('exit', resolve)
  })
}

async function copy() {
  return new Promise(resolve => {
    const ps = spawn('cp', ['-r', 'provision', 'provision_real'])
    ps.on('exit', resolve)
  })
}

async function copyEnv() {
  return new Promise(resolve => {
    const ps = spawn('cp', ['.env', 'provision_real/.env'])
    ps.on('exit', resolve)
  })
}

async function convert(file) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(file, (err, data) => {
      if (err) {
        reject(err)
      }
      fs.writeFile(file, data, 'utf8', err => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  })
}

const paths = [
  './provision_real/roles/app/files/docker-daemon.json',
  './provision_real/roles/db/files/pg_hba.conf',
  './provision/roles/web/files/nginx.conf',
]

async function main() {
  await clear()
  await copy()
  await copyEnv()
  await Promise.all(paths.map(convert))
}

main()
