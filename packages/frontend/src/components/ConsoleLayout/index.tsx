import * as React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Sidebar, Tab } from './Sidebar'

const Container = styled.div`
  margin: 64px 0 0 200px;
`

interface Props {
  activeTab: Tab
  children?: any
  title?: string
}

export const ConsoleLayout = ({ children, activeTab, title }: Props) => (
  <>
    <Sidebar activeTab={activeTab} />
    <Header title={title} />
    <Container>{children}</Container>
  </>
)
