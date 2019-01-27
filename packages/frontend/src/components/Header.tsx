import * as React from 'react'
import Hidden from '@material-ui/core/Hidden'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@larkin/frontend/components/Button'
import { subscribe } from '@larkin/frontend/services/api'

const Container = styled.div`
  padding: 18px;
  max-width: 1024px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  /*
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
  */
`

const LogoImg = styled.img`
  width: 40px;
  margin-top: 6px;
  margin-right: -6px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const ListItem = styled.li`
  list-style: none;
  margin-left: 36px;
  cursor: pointer;
  font-size: 14px;
`

export class Header extends React.Component {
  state = {
    email: '',
    sending: false,
  }

  subscribe = async () => {
    const isValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      this.state.email,
    )
    if (!isValid) {
      alert('Email is wrong.')
      return
    }

    this.setState({ sending: true })
    await subscribe(this.state.email)
    this.setState({ email: '', sending: false })
    window.alert('Thank you for subscribing us! Get in touch soon.')
  }

  wip = () => {
    alert(
      'Thank you for click me. Currently WIP state, so please subscribe us by submiting the form right!',
    )
  }

  render() {
    return (
      <Container>
        <HeaderLeft>
          <Link to="/">
            <LogoImg src="https://larkin.sh/static/images/logo-mark.png" />
          </Link>
          <ListItem>
            <a href="https://github.com/getlarkin/larkin" target="_blank">
              GitHub
            </a>
          </ListItem>
          <Hidden mdDown>
            <ListItem onClick={this.wip}>Features</ListItem>
            <ListItem onClick={this.wip}>Pricing</ListItem>
            <ListItem onClick={this.wip}>Company</ListItem>
          </Hidden>
        </HeaderLeft>
        <HeaderLeft>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </HeaderLeft>
      </Container>
    )
  }
}

// <TextField
//   placeholder="you@example.com"
//   value={this.state.email}
//   type="email"
//   onChange={(e: any) => this.setState({ email: e.target.value })}
// />
// <ListItem>
//   {sending ? '...' : <Button onClick={this.subscribe}>Subscribe</Button>}
// </ListItem>
