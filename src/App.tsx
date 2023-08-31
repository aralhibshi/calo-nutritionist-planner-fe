import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import NavBar from './components/header/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'

// Fonts
import '../src/assets/fonts/Roboto/Roboto-Thin.ttf'
import '../src/assets/fonts/Roboto/Roboto-ThinItalic.ttf'
import '../src/assets/fonts/Roboto/Roboto-Light.ttf'
import '../src/assets/fonts/Roboto/Roboto-LightItalic.ttf'
import '../src/assets/fonts/Roboto/Roboto-Regular.ttf'
import '../src/assets/fonts/Roboto/Roboto-RegularItalic.ttf'
import '../src/assets/fonts/Roboto/Roboto-Medium.ttf'
import '../src/assets/fonts/Roboto/Roboto-MediumItalic.ttf'
import '../src/assets/fonts/Roboto/Roboto-Bold.ttf'
import '../src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'
import '../src/assets/fonts/Roboto/Roboto-Black.ttf'
import '../src/assets/fonts/Roboto/Roboto-BlackItalic.ttf'

Amplify.configure(awsconfig)

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
        <div style={{
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