import * as React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { TextField } from '@larkin/frontend/components/TextField'
import styled from 'styled-components'
import { ConsoleLayout } from '@larkin/frontend/components/ConsoleLayout'
import { RouteComponentProps } from 'react-router'
import { getContainers, updateDomainPublicHost } from '@larkin/frontend/services/api'
import { Container } from '@larkin/frontend/entities/Container'
import { Title } from '@larkin/frontend/components/Title'
import { Button } from '@larkin/frontend/components/Button'
import { destroyContainer } from '@larkin/frontend/services/api'
import { CONTAINERS_PATH } from '@larkin/frontend/Routes'

const _Container = styled.div`
  max-width: 1024px;
  padding: 12px;
  margin: auto;
`

const Section = styled.div`
  background: #fff;
  border-radius: 3px;
  padding: 12px 24px 24px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`

const Label = styled.div`
  width: 200px;
  color: #888;
`

const Value = styled.div`
  margin-left: 24px;
  color: #333;
`

const SmallButton = styled.div`
  margin-left: 24px;
  color: #5268a0;
  border: solid 1px #a6b1cc;
  border-radius: 4px;
  padding: 5px 13px;
  cursor: pointer;
  display: inline-block;
`

const SslNote = styled.div`
  display: flex;
`

interface State {
  containers: Container[]
  newDomain: string
  editingDomain: boolean
  useSsl: boolean
}

export class ContainerDetail extends React.Component<RouteComponentProps<{ id: string }>, State> {
  state = {
    containers: [] as Container[],
    newDomain: '',
    editingDomain: false,
    useSsl: true,
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const containers = (await getContainers()).data
    this.setState({ containers })
  }

  toEditDomain = () => {
    this.setState({ editingDomain: true })
  }

  onChangeNewDomain = (e: any) => {
    this.setState({ newDomain: e.target.value })
  }

  onSubmitNewDomain = async () => {
    const { newDomain, useSsl } = this.state
    await updateDomainPublicHost(this.targetContainer.id, newDomain, useSsl)
    await this.fetch()
    this.setState({ editingDomain: false })
  }

  get targetContainer() {
    const container = this.state.containers.find(c => c.id === this.props.match.params.id)
    if (!container) {
      throw new Error('container not found')
    }
    return container
  }

  deleteContainer = async () => {
    if (!window.confirm('are you sure?')) {
      return
    }

    await destroyContainer(this.targetContainer.id)

    this.props.history.replace(CONTAINERS_PATH)
  }

  render() {
    const { containers, editingDomain, newDomain, useSsl } = this.state
    if (containers.length === 0) {
      return <ConsoleLayout activeTab="containers" />
    }

    return (
      <ConsoleLayout activeTab="containers" title={`Containers > ${this.targetContainer.id}`}>
        <_Container>
          <Title>Information</Title>
          <Section>
            <Row>
              <Label>Container ID</Label>
              <Value>{this.targetContainer.id}</Value>
            </Row>
            <Row>
              <Label>Image</Label>
              <Value>{this.targetContainer.image}</Value>
            </Row>
            <Row>
              <Label>Endpoint</Label>
              <Value>
                <a
                  href={`https://${this.targetContainer.public_host}`}
                  target="_blank"
                >{`https://${this.targetContainer.public_host}`}</a>
              </Value>
              {editingDomain ? (
                <Value>
                  https://
                  <TextField value={newDomain} onChange={this.onChangeNewDomain} autoFocus />
                  <SmallButton onClick={this.onSubmitNewDomain}>Done</SmallButton>
                  <SslNote>
                    <Checkbox
                      checked={useSsl}
                      onChange={() => this.setState({ useSsl: !useSsl })}
                      color="primary"
                    />
                    Use SSL to make standalone https connection. If you use CDN like Cloudflare,
                    please check off.
                  </SslNote>
                  <div>
                    Note: You have to set your A record to <code>18.212.162.232</code>
                  </div>
                </Value>
              ) : (
                <SmallButton onClick={this.toEditDomain}>Set custom domain</SmallButton>
              )}
            </Row>
            <Row>
              <Label>Status</Label>
              <Value>{this.targetContainer.status}</Value>
            </Row>
            <Row>
              <Label>Created</Label>
              <Value>{this.targetContainer.created_at}</Value>
            </Row>
          </Section>

          <Title>Actions</Title>
          <Section>
            <Row>
              <Label>
                <Button variant="danger" onClick={this.deleteContainer}>
                  Delete Container
                </Button>
              </Label>
              <Value>Delete this container permanently.</Value>
            </Row>
          </Section>
        </_Container>
      </ConsoleLayout>
    )
  }
}
