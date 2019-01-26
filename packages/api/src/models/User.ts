import { Model } from 'objection'
import { ModelBase } from '@larkin/api/models/ModelBase'
import { getRandomStringLong } from '@larkin/api/helpers/getRandomString'

type ContractType = 'hobby' | 'basic' | 'pro'

export class User extends ModelBase {
  name!: string
  email!: string
  contract_type!: ContractType
  avatar_url?: string
  github_id!: string
  github_url!: string
  github_access_token!: string
  github_refresh_token!: string
  api_token!: string
  onetime_docker_login_token!: string

  static tableName = 'users'

  $beforeInsert() {
    super.$beforeInsert()
    if (!this.api_token) {
      this.api_token = getRandomStringLong() + getRandomStringLong()
    }
  }

  async canCreateContainer(): Promise<boolean> {
    const runningContainers = await this.$query().whereExists(
      this.$relatedQuery('containers').where({ status: 'running' }),
    )

    if (this.contract_type === 'hobby' && runningContainers) {
      return false
    }
    return true
  }

  static get relationMappings() {
    return {
      containers: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Container',
        join: {
          from: 'users.id',
          to: 'containers.user_id',
        },
      },
    }
  }
}
