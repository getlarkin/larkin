import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Header } from '@larkin/frontend/components/Header'
import { Button } from '@larkin/frontend/components/Button'

const Container = styled.div`
  max-width: 1024px;
  margin: 36px auto;
  text-align: center;
`

const GitHubButton = styled(Button)`
  background: #333;
`

interface State {
  email: string
  password: string
}

const OAUTH_URL = `${process.env.API_URL}/auth/github`

export class Login extends React.Component<RouteComponentProps, State> {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <>
        <Header />
        <Container>
          <a href={OAUTH_URL}>
            <GitHubButton>Login with GitHub</GitHubButton>
          </a>
        </Container>
      </>
    )
  }
}
