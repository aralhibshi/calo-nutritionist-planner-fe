import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import NavBar from './components/header/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import { Container, Box } from '@mui/material';
Amplify.configure(awsconfig);

function App({ signOut, user }: WithAuthenticatorProps) {
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
        <Container sx={{
          flexGrow: 1
          }}>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);