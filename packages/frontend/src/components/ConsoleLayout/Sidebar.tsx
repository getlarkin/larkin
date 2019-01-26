import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BarChartIcon from '@material-ui/icons/BarChart'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import ScheduleIcon from '@material-ui/icons/Schedule'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PanoramaIcon from '@material-ui/icons/Panorama'
import PowerSettingIcon from '@material-ui/icons/PowerSettingsNew'
import { DASHBOARD_PATH, CONTAINERS_PATH, IMAGES_PATH } from '@larkin/frontend/Routes'
import { Hidden } from '@larkin/frontend/components/Hidden'

const Container = styled.div`
  height: 100vh;
  background: #7386b8;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
`

const LogoContainer = styled.div`
  padding: 12px;
`

const Logo = styled.img`
  margin-top: 10px;
  width: 100%;
`

const List = styled.div`
  margin-top: 18px;
`

interface ListItemInterface {
  isActive?: boolean
}

const ListItem = styled.div<ListItemInterface>`
  padding: 12px;
  color: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
  cursor: pointer;
  background: ${props => (props.isActive ? '#5268a0' : 'inherit')};
`

const ListText = styled.div`
  margin-left: 16px;
`

export type Tab = 'dashboard' | 'containers' | 'images' | 'tasks' | 'billing'

interface Props {
  activeTab: Tab
}

const logout = () => {
  window.localStorage.removeItem('token')
  window.location.href = '/'
}

export const Sidebar = ({ activeTab }: Props) => (
  <Container>
    <LogoContainer>
      <Logo src="https://docker-run.com/static/images/logo-white.png" />
    </LogoContainer>
    <List>
      <Link to={CONTAINERS_PATH}>
        <ListItem isActive={activeTab === 'containers'}>
          <ViewComfyIcon />
          <ListText>Containers</ListText>
        </ListItem>
      </Link>
      <Link to={IMAGES_PATH}>
        <ListItem isActive={activeTab === 'images'}>
          <PanoramaIcon />
          <ListText>Registry</ListText>
        </ListItem>
      </Link>
      <ListItem onClick={logout}>
        <PowerSettingIcon />
        <ListText>Logout</ListText>
      </ListItem>

      <Hidden>
        <Link to={DASHBOARD_PATH}>
          <ListItem isActive={activeTab === 'dashboard'}>
            <BarChartIcon />
            <ListText>Dashboard</ListText>
          </ListItem>
        </Link>
        <ListItem isActive={activeTab === 'tasks'}>
          <ScheduleIcon />
          <ListText>Tasks</ListText>
        </ListItem>
        <ListItem isActive={activeTab === 'billing'}>
          <CreditCardIcon />
          <ListText>Billing</ListText>
        </ListItem>
      </Hidden>
    </List>
  </Container>
)
