import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/registro" exact component={Register} />
        <Route path="/perfil" exact component={Profile} />
        <Route path="/novo-caso" exact component={NewIncident} />
      </Switch>
    </BrowserRouter>
  )
}
export default Routes
