import { spawn, ChildProcess } from 'child_process'
import { logger } from '@larkin/api/services/logger'
import { getRandomString } from '@larkin/api/helpers/getRandomString'

export const getContainerPort = (imageName: string) =>
  new Promise(resolve => {
    const ps = spawn('docker', ['image', 'inspect', imageName])
    ps.stdout.on('data', (data: any) => {
      try {
        const json = JSON.parse(data.toString())
        const port = Object.keys(json[0].ContainerConfig.ExposedPorts)[0].split('/')[0]
        return resolve(Number(port))
      } catch (e) {
        return null
      }
    })
  })

type HandleStdIo = (data: any) => void

const replacePrivateRepositoryHost = (image: string) =>
  image.replace('registry.larkin.sh', process.env.REGISTRY_LOCAL_IP as string)

export const dockerPull = (image: string, handleStdIo: HandleStdIo) =>
  new Promise((resolve, reject) => {
    const ps = spawn('docker', ['pull', replacePrivateRepositoryHost(image)])
    ps.stdout.on('data', handleStdIo)
    ps.stderr.on('data', handleStdIo)
    ps.on('exit', code => {
      if (code !== 0) {
        return reject(code)
      }
      resolve()
    })
  })

export const dockerRun = async (
  image: string,
  hostPort: number,
  handleStdIo: HandleStdIo,
  callback?: (ps: ChildProcess) => any,
) => {
  const name = getRandomString()
  const containerPort = await getContainerPort(replacePrivateRepositoryHost(image))
  const ps = spawn('docker', [
    'run',
    '-d',
    '--name',
    name,
    '--rm',
    '-p',
    `${hostPort}:${containerPort}`,
    replacePrivateRepositoryHost(image),
  ])
  ps.stdout.on('data', handleStdIo)
  ps.stderr.on('data', handleStdIo)
  if (callback) {
    setImmediate(() => callback(ps))
  }
  return name
}

export const dockerKill = (name: string) =>
  new Promise(resolve => {
    const ps = spawn('docker', ['kill', name])
    ps.stdout.on('data', data => logger.info(data.toString()))
    ps.on('exit', resolve)
  })
