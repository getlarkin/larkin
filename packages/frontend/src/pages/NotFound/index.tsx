import * as React from 'react'
import styled from 'styled-components'
import { Header } from '@larkin/frontend/components/Header'

const Container = styled.div`
  font-size: 28px;
  text-align: center;
  padding-top: 28px;
`

export const NotFound = () => (
  <>
    <Header />
    <Container>404 Not Found</Container>
  </>
)
