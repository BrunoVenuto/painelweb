import React from 'react';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Profile from '../pages/profile';
import Dashboard from '../pages/dashboard';
import { isLogged } from '../services/AuthHandler';
import { history } from '../history'



const PrivateRoute = ({children, ...rest}) => {
    return (
        <Route {...rest}>
            {isLogged() ? children : <Redirect to="/" />}
        </Route>
    );
}

const Routes = () =>(
    <BrowserRouter history={history}>
        <Switch>
            <Route exact path='/'  component={SignIn} />
            <Route exact path='/signUp'  component={SignUp} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
    </BrowserRouter>
);


export default Routes;