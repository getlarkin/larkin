import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 64px;
  margin-left: 200px;
  align-items: center;
  background: #fff;
  padding: 12px;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: solid 1px #eee;
`

interface Props {
  title?: string
}

export const Header = ({ title }: Props) => <Container>{title}</Container>
