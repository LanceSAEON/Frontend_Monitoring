import logo from './logo.svg';
import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { onError } from '@apollo/client/link/error'
import { AuthProvider } from './contexts/AuthContext'
import Login from './Components/User/Login'
import Signup from './Components/User/Signup'
import PrivateRoute from './Components/PrivateRoute';
import UpdateProfile from './Components/User/UpdateProfile';
import ForgotPassword from './Components/User/ForgotPassword';
import Dashboard from './Components/Dashboard'

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors)
    graphqlErrors.map(({message, location, path}) => { alert(`Graphql error: ${message} | Location: ${location} | Path: ${path}`); })
})

const link = from([ 
  errorLink,
  new HttpLink({ 
    uri: process.env.REACT_APP_SERVER_GRAPHQL_URI
  })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <div className="header-blue" style={{ height: "100vh" }}>
      <Router>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Switch>
              {/* Private Routes (Requires auth/account) */}
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/:category" component={Dashboard} />
              <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>

              {/* Public Routes (No auth needed) */}
              <Route path='/login' component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />

              {/* External links */}
              <Route path='/privacy-policy' component={() => { window.location.href = 'https://google.com'; return null; }}/>
              <Route path='/live-catalogue' component={() => { window.location.href = 'https://catalogue.saeon.ac.za/'; return null; }}/>
              <Route path='/facebook' component={() => { window.location.href = 'https://www.facebook.com/SAEONGSN2016/'; return null; }}/>
              <Route path='/twitter' component={() => { window.location.href = 'https://twitter.com/saeonews?lang=en'; return null; }}/>
              <Route path='/github' component={() => { window.location.href = 'https://github.com/SAEONData/'; return null; }}/>
            </Switch>
          </ApolloProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
