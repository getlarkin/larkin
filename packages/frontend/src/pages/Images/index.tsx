import * as React from 'react'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { ConsoleLayout } from '@larkin/frontend/components/ConsoleLayout'
import { Title } from '@larkin/frontend/components/Title'
import { getContainers, getMe } from '@larkin/frontend/services/api'
// import { Button } from '@larkin/frontend/components/Button'
import { Terminal } from '@larkin/frontend/components/Terminal'
import { getLink, CONTAINER_PATH } from '@larkin/frontend/Routes'
import { Container } from '@larkin/frontend/entities/Container'
import { User } from '@larkin/frontend/entities/User'

const Container = styled.div`
  max-width: 1024px;
  padding: 36px 12px 0;
  margin: 24px auto;
`

const Comment = styled.p`
  color: #5590c9;
  margin-top: 18px;
`

// const TableContainer = styled.div`
//   background: #fff;
//   border: solid 1px #eee;
//   margin-top: 24px;
// `

// const ClickableTableRow: any = styled(TableRow)`
//   cursor: pointer;
// `

// const UpgradeAlert = styled.span`
//   display: inline;
//   margin-left: 18px;
//   color: #ed7070;
// `

interface State {
  containers: Container[]
  me?: User
  launchModalOpen: boolean
}

export class Images extends React.Component<RouteComponentProps, State> {
  state = {
    containers: [] as Container[],
    me: undefined,
    launchModalOpen: false,
  }

  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    const containers = (await getContainers()).data
    const me = (await getMe()).data
    this.setState({ containers, me })
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
    const { me } = this.state

    if (!me) {
      return <ConsoleLayout activeTab="images" />
    }

    const user: User = me

    return (
      <ConsoleLayout activeTab="images">
        <Container>
          <Title>docker-run.com registry</Title>
          <div>You can push your Docker image to docker-run.com private registry.</div>
          <Terminal>
            <Comment>
              # 1. Retrieve the login command to use to authenticate your Docker client to your
              registry. Use curl request:
            </Comment>
            <p>
              $(curl -H "X-TOKEN: {user.api_token}" {process.env.API_URL}/get_docker_login)
            </p>
            <Comment>
              # 2. Build your Docker image using the following command. You can skip this step if
              your image is already built:
            </Comment>
            <p>docker build -t myapp .</p>
            <Comment>
              # 3. After the build completes, tag your image so you can push the image to this
              repository:
            </Comment>
            <p>docker tag myapp:latest registry.docker-run.com/{user.id}/myapp</p>
            <Comment>
              # 4. Run the following command to push this image to your newly created docker-run.com
              repository:
            </Comment>
            <p>docker push registry.docker-run.com/{user.id}/myapp:latest</p>
          </Terminal>
        </Container>
      </ConsoleLayout>
    )
  }
}
