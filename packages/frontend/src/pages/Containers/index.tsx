import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { ConsoleLayout } from '@larkin/frontend/components/ConsoleLayout'
import { getContainers } from '@larkin/frontend/services/api'
import { Button } from '@larkin/frontend/components/Button'
import { getLink, CONTAINER_PATH } from '@larkin/frontend/Routes'
import { Container } from '@larkin/frontend/entities/Container'
import { LaunchModal } from './LaunchModal'

const Container = styled.div`
  max-width: 1024px;
  padding: 36px 12px 0;
  margin: 24px auto;
`

const TableContainer = styled.div`
  background: #fff;
  border: solid 1px #eee;
  margin-top: 24px;
`

const ClickableTableRow: any = styled(TableRow)`
  cursor: pointer;
`

const UpgradeAlert = styled.span`
  display: inline;
  margin-left: 18px;
  color: #ed7070;
`

interface State {
  containers: Container[]
  launchModalOpen: boolean
}

export class Containers extends React.Component<RouteComponentProps, State> {
  state = {
    containers: [] as Container[],
    launchModalOpen: false,
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const containers = (await getContainers()).data
    this.setState({ containers })
  }

  onLaunch = async () => {
    await this.fetch()
    this.setState({ launchModalOpen: false })
  }

  toContainer = (id: string) => {
    this.props.history.push(getLink(CONTAINER_PATH, id))
  }

  openLaunchContainerModal = () => this.setState({ launchModalOpen: true })
  closeLaunchContainerModal = () => this.setState({ launchModalOpen: false })

  get canRunContainer() {
    return this.state.containers.length === 0
  }

  render() {
    const { containers, launchModalOpen } = this.state

    return (
      <ConsoleLayout activeTab="containers">
        <Container>
          <Button disabled={!this.canRunContainer} onClick={this.openLaunchContainerModal}>
            Launch Container
          </Button>

          {!this.canRunContainer && (
            <UpgradeAlert>
              If you run 2 or more containers, you have to upgrade your plan (coming soon).
            </UpgradeAlert>
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Endpoint</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {containers.map(container => (
                  <ClickableTableRow
                    key={container.id}
                    id={container.id}
                    onClick={() => this.toContainer(container.id)}
                    hover
                  >
                    <TableCell>{container.image}</TableCell>
                    <TableCell>{container.public_host}</TableCell>
                    <TableCell>{container.status}</TableCell>
                    <TableCell>{container.created_at}</TableCell>
                  </ClickableTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <LaunchModal
          open={launchModalOpen}
          onClose={this.closeLaunchContainerModal}
          onLaunch={this.onLaunch}
        />
      </ConsoleLayout>
    )
  }
}
