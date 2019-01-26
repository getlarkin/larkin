import { Model } from 'objection'
import { ModelBase } from '@larkin/api/models/ModelBase'

type ContainerStatus = 'initializing' | 'running' | 'terminated'

export class Container extends ModelBase {
  user_id!: string
  image!: string
  internal_container_id!: string
  status!: ContainerStatus
  command?: string
  public_host!: string
  proxy_host!: string
  proxy_port!: number

  static tableName = 'containers'

  $beforeInsert() {
    super.$beforeInsert()
    if (!this.user_id) {
      this.user_id = '00000000-0000-0000-0000-000000000000'
    }
  }

  static get relationMappings() {
    return {
      containers: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'containers.user_id',
          to: 'users.id',
        },
      },
    }
  }
}
