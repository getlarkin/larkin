import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { Header } from '@larkin/frontend/components/Header'
import { Button } from '@larkin/frontend/components/Button'
import { Gradation } from '@larkin/frontend/components/Gradation'
import { TextField } from '@larkin/frontend/components/TextField'

const Container = styled.div`
  min-height: 100vh;
  text-align: center;
`

const MyGradation = styled(Gradation)`
  min-height: 100vh;
`

const TitleContainer = styled.div`
  margin: auto;
  max-width: 560px;
  text-align: center;
  justify-content: center;
  margin-top: 18px;
  @media (min-width: 768px) {
    margin-top: 100px;
  }
`

const Title = styled.h1`
  color: #333;
  font-size: 36px;
`

const SubTitle = styled.h1`
  color: #666;
  font-size: 16px;
`

const FormContainer = styled.div`
  margin-top: 45px;
`

const FormContainerButton = styled.div`
  margin-left: 24px;
`

const InputContainer = styled.div`
  margin-left: 12px;
`

const DemoImage = styled.img`
  width: 100%;
  max-width: 800px;
  margin-top: 50px;
  box-shadow: 1px 1px 58px -3px rgba(0, 0, 0, 0.4);
`

const Footer = styled.div`
  border-top: solid 1px #ccc;
  padding: 12px;
  display: flex;
  justify-content: center;
`

export class Landing extends React.Component<RouteComponentProps> {
  state = {
    image: '',
  }

  submit = () => {
    if (!this.state.image) {
      return alert('An image name is required. How about "grafana/grafana"?')
    }
    this.props.history.push(`/try/?image=${this.state.image}`)
  }

  render() {
    const { image } = this.state

    return (
      <>
        <MyGradation>
          <Header />
          <TitleContainer>
            <Title>A new and better way to run Docker Containers in production</Title>
          </TitleContainer>
          <TitleContainer>
            <SubTitle>
              A complete Docker infrastructure for your production applications: <br />
              Deploy and run your custom Docker image in 30 seconds.
            </SubTitle>
          </TitleContainer>
          <FormContainer>
            <Grid container justify="center" alignItems="center" spacing={16}>
              <Grid item>
                <div>$ docker run</div>
              </Grid>
              <Grid item>
                <InputContainer>
                  <TextField
                    placeholder="nginx:latest"
                    value={image}
                    onChange={(e: any) => this.setState({ image: e.target.value })}
                  />
                </InputContainer>
              </Grid>
              <Grid item>
                <FormContainerButton>
                  <Button onClick={this.submit}>Run your container</Button>
                </FormContainerButton>
              </Grid>
            </Grid>
          </FormContainer>
        </MyGradation>
        <Container>
          <TitleContainer>
            <Title>How it works</Title>
          </TitleContainer>
          <DemoImage
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--EtTOSDxH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/8ts8dhg4dobhoekyrr3u.gif"
            alt="demo"
          />
        </Container>
        <Footer>
          copyright{' '}
          <a href="https://github.com/acro5piano/" target="_blank">
            @acro5piano
          </a>
        </Footer>
      </>
    )
  }
}
