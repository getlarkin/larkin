import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Landing } from '@larkin/frontend/pages/Landing'
import { NotFound } from '@larkin/frontend/pages/NotFound'
import { Try } from '@larkin/frontend/pages/Try'
import { Login } from '@larkin/frontend/pages/Auth/Login'
import { Dashboard } from '@larkin/frontend/pages/Dashboard'
import { Containers } from '@larkin/frontend/pages/Containers'
import { ContainerDetail } from '@larkin/frontend/pages/ContainerDetail'
import { Images } from '@larkin/frontend/pages/Images'

export const LANDING_PATH = '/'
export const TRY_PATH = '/try'
export const LOGIN_PATH = '/login'
export const DASHBOARD_PATH = '/dashboard'
export const CONTAINERS_PATH = '/containers'
export const CONTAINER_PATH = '/containers/:id'
export const IMAGES_PATH = '/images'
export const IMAGE_PATH = '/image'

// Get full path to a resource.
//     e.g.) getLink('/users/:id/edit', 1) => /customers/1/visits/new
export const getLink = (pathname: string, ...ids: any[]): string =>
  ids.reduce((cur, id) => cur.replace(/:[a-z|A-Z]+/, id), pathname)

export const Routes = () => (
  <Switch>
    <Route exact path={LANDING_PATH} component={Landing} />
    <Route exact path={TRY_PATH} component={Try} />
    <Route exact path={LOGIN_PATH} component={Login} />
    <Route exact path={DASHBOARD_PATH} component={Dashboard} />
    <Route exact path={CONTAINERS_PATH} component={Containers} />
    <Route exact path={CONTAINER_PATH} component={ContainerDetail} />
    <Route exact path={IMAGES_PATH} component={Images} />
    <Route exact path="/auth/github/callback" component={Login} />
    <Route component={NotFound} />
  </Switch>
)
