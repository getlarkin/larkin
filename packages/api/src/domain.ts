import * as AWS from 'aws-sdk'
import { isProduction } from '@larkin/api/helpers/environ'
import { getRandomString } from '@larkin/api/helpers/getRandomString'

const getDomainAliasName = (): string => {
  return getRandomString() + '.larkin.sh'
}

export const createDomain = (): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!isProduction) {
      return resolve('docker-run.local:5588')
    }

    const domainName = getDomainAliasName()

    const route53 = new AWS.Route53({
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    })

    route53.changeResourceRecordSets(
      {
        HostedZoneId: 'Z22DAOHZIONMU0',
        ChangeBatch: {
          Changes: [
            {
              Action: 'CREATE',
              ResourceRecordSet: {
                Name: domainName,
                Type: 'A',
                AliasTarget: {
                  HostedZoneId: 'Z1Q0J5C9L8GZSH',
                  DNSName: 'dualstack.drc-production-586017450.us-east-1.elb.amazonaws.com.',
                  EvaluateTargetHealth: false,
                },
              },
            },
          ],
        },
      },
      (err: any) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(domainName)
        }
      },
    )
  })
