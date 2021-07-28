import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Container} from 'react-bootstrap'
import AuthProvider from './contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import UpdateProfile from './components/UpdateProfile'

export default function App() {
  return (
    <Container style={{minHeight:"100vh"}} className="p-3 d-flex align-items-center justify-content-center">
      <div className="w-100" style={{maxWidth:"400px"}} >
        <AuthProvider>
            <Router history={window.history}>
              <Switch>
                <PrivateRoute path="/" exact component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
              </Switch>
            </Router>
        </AuthProvider>
      </div>
    </Container>
  )
}