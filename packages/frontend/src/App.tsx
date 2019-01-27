import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from '@larkin/frontend/GlobalStyle'
import { DownAlert } from '@larkin/frontend/components/DownAlert'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Routes } from '@larkin/frontend/Routes'
import CssBaseline from '@material-ui/core/CssBaseline'
import { getUrlQuery } from '@larkin/frontend/utils'
import { loginWithGitHubToken } from '@larkin/frontend/services/api'
import { loginWithJWTToken } from '@larkin/frontend/services/api'
import { CONTAINERS_PATH } from '@larkin/frontend/Routes'

const mainTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

export class App extends React.Component<{}> {
  async componentDidMount() {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      await loginWithJWTToken()
    }

    const code = getUrlQuery('code')
    if (code) {
      const token = await loginWithGitHubToken(code)
      if (token) {
        localStorage.setItem('token', token.data)
        window.location.href = CONTAINERS_PATH
        return
      }
    }
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <CssBaseline />
        <DownAlert />
        <MuiThemeProvider theme={mainTheme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiThemeProvider>
      </>
    )
  }
}
