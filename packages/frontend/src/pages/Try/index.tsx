import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { health } from '@larkin/frontend/services/api'
import { Header } from '@larkin/frontend/components/Header'
import { getUrlQuery } from '@larkin/frontend/utils'

const StatusIndicator = styled.div`
  width: 80%;
  margin: 24px auto;
  max-width: 800px;
  background: #f5f5f5;
  padding: 12px 18px;
  border-radius: 3px;
`

const Status = styled.div`
  margin-top: 12px;
`

const Console = styled.div`
  white-space: pre-wrap;
  font-family: 'Roboto Mono', monospace;
  padding: 12px 18px;
  color: #f8f8f8;
  width: 80%;
  max-width: 800px;
  overflow: scroll;
  margin: auto;
  border-radius: 4px;
  background: #333;
  min-height: 400px;
  margin-top: 45px;
`

type Props = RouteComponentProps

interface State {
  output: string[]
  appUrl: string
  expired: boolean
  status: string
}

export class Try extends React.Component<Props, State> {
  state = {
    output: [],
    appUrl: 'Getting domain...',
    status: '',
    expired: false,
  }

  async componentDidMount() {
    try {
      await health()
    } catch (e) {
      alert('Thank you, but rate limit exceeded. Please try again 10 minutes later!')
      return
    }

    const image = getUrlQuery('image')
    if (!image) {
      throw new Error('image is not set')
    }
    console.log(image)

    const ws = new WebSocket(process.env.WS_URL || '')
    ws.onmessage = ({ data }) => {
      const dockerRunRegex = /http[s]?:\/\/[a-z|\d|.]*?docker\-run\.(com|local)(:5588)?/
      const matchUrl = data.match(dockerRunRegex)
      if (matchUrl) {
        this.setState({
          appUrl: matchUrl[0],
        })
      }
      const matchStatus = data.match(/(STEP \d.+$)/)
      if (matchStatus) {
        this.setState({
          status: matchStatus[0],
        })
      }
      const matchExpired = data.match(/Killing docker container/)
      if (matchExpired) {
        this.setState({
          expired: true,
          status: 'Finished. Thank you for applying demo. please Subscribe larkin.sh!',
        })
      }
      this.setState({ output: [...this.state.output, data] })
    }
    ws.onopen = () => ws.send(image)
  }

  render() {
    const { output, appUrl, status, expired } = this.state

    return (
      <>
        <Header />
        <StatusIndicator>
          <div>
            Your App URL:{' '}
            <a href={appUrl} target="_blank">
              {appUrl}
              {expired
                ? ' (expired due to 120 seconds limit)'
                : ' (will take some time to complete domain)'}
            </a>
          </div>
          <Status>{status}</Status>
        </StatusIndicator>
        <Console>
          {output.map((output, index) => (
            <p key={index}>{output}</p>
          ))}
        </Console>
      </>
    )
  }
}
