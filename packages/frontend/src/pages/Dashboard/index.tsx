import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { ConsoleLayout } from '@larkin/frontend/components/ConsoleLayout'
import { Card } from '@larkin/frontend/components/Card'
import { Title } from '@larkin/frontend/components/Title'

const Container = styled.div`
  max-width: 1024px;
  padding: 12px;
  margin: auto;
`

export class Dashboard extends React.Component<RouteComponentProps> {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {}

  render() {
    return (
      <ConsoleLayout activeTab="dashboard">
        <Container>
          <Title>Summary</Title>
          <Grid container spacing={16} justify="space-between">
            <Grid item>
              <Card num={3} text="Running containers" />
            </Grid>
            <Grid item>
              <Card num={3} text="Running containers" />
            </Grid>
            <Grid item>
              <Card num={3} text="Running containers" />
            </Grid>
          </Grid>
        </Container>
      </ConsoleLayout>
    )
  }
}
