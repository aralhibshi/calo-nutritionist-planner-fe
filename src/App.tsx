import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
Amplify.configure(awsconfig);



function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <Router>
      <div>
        <NavBar signOut={signOut} user={user} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </Router>
  );
}

export default withAuthenticator(App);