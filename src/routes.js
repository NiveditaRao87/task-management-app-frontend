import React, {useContext}  from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from './user-context'
import Register from './pages/Register'
import Login from './pages/Login'
import Kanban from './pages/Kanban'

const Routes = () => {
    
    const { isAuthenticated } = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                  { isAuthenticated ? <Kanban /> : <Redirect to='/login' /> }
                </Route> 
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact>
                  { isAuthenticated ? <Redirect to='/' /> : <Login /> }
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes

//In future will have routes for archive and project graphs