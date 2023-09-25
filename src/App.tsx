import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import NavBar from './components/header/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import useUserStore from './stores/userStore';

Amplify.configure(awsconfig)

function App({ signOut, user }: WithAuthenticatorProps) {
  const {
    setStoreUser
  } = useUserStore()
  useEffect(() => {
    setStoreUser(user)
  }, [user])

  return (
      <Router>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          minWidth: '100vw'
          }}
        >
          <NavBar
            signOut={signOut}
            user={user}
          />
          <div
            style={{
              marginLeft: '32px',
              marginRight: '32px'
            }}
          >
            <Routes>
                <Route
                  path="/"
                  element={<Home/>}
                />
              </Routes>
          </div>
        </div>
      </Router>
  );
}

export default withAuthenticator(App);