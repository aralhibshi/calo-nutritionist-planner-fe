import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';
import NavBar from './components/header/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import { Container, Box } from '@mui/material';
import IngredientsIndex from './pages/ingredient/IngredientIndex';
Amplify.configure(awsconfig);



function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div>
          <NavBar signOut={signOut} user={user} />
        </div>
        <Container sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Ingredients" element={<IngredientsIndex/>} />
          </Routes>
        </Container>
        <Box component="footer" sx={{ textAlign: 'center', py: 2 }}>
          Calo Nutrition Planner
        </Box>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);