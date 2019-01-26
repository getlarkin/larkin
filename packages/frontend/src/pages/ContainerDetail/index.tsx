import * as React from 'react'
import styled from 'styled-components'
import { ConsoleLayout } from '@larkin/frontend/components/ConsoleLayout'
import { RouteComponentProps } from 'react-router'
import { getContainers } from '@larkin/frontend/services/api'
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

interface State {
  containers: Container[]
}

export class ContainerDetail extends React.Component<RouteComponentProps<{ id: string }>, State> {
  state = {
    containers: [] as Container[],
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const containers = (await getContainers()).data
    this.setState({ containers })
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
    if (this.state.containers.length === 0) {
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
                <a href={`https://${this.targetContainer.public_host}`} target="_blank">{`https://${
                  this.targetContainer.public_host
                }`}</a>
              </Value>
            </Row>
            <Row>
              <Label>Status</Label>
              <Value>Running</Value>
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
                <Button type="danger" onClick={this.deleteContainer}>
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
