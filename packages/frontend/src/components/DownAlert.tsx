import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  border-radius: 3px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eb7b68;
  color: #fff;
  font-weight: bold;
`

export const DownAlert = () => (
  <Container>
    Sorry we are migrating to <a href="https://larkin.sh">larkin.sh</a> to be OSS!
  </Container>
)
