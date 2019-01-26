import * as React from 'react'

export class ErrorBoundry extends React.Component<any> {
  componentDidCatch() {
    alert('Too many request. please try again later.')
  }

  render() {
    return this.props.children
  }
}
