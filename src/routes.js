import React, { useContext }  from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from './contexts/user-context'
import Register from './pages/Register'
import Login from './pages/Login'
import Kanban from './pages/Kanban'
import { TimerContextWrapper } from './contexts/timer-context'

const Routes = () => {

  const { isAuthenticated } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          { isAuthenticated 
            ? <TimerContextWrapper>
                <Kanban />
              </TimerContextWrapper>
            : <Redirect to='/login' /> }
        </Route>
        <Route path='/register' exact component={Register} />
        {/* Have to explicitly pass props when a component
        is called like this and not specified as a component */}
        <Route path='/login' render={(props) =>
          isAuthenticated ? <Redirect to='/' /> : <Login {...props} /> } />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes

//In future will have routes for archive and project graphs