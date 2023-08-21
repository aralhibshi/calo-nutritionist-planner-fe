import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { WithAuthenticatorProps } from '@aws-amplify/ui-react';

interface NavBarProps {
  signOut: WithAuthenticatorProps['signOut'];
  user: WithAuthenticatorProps['user'];
}

export default function NavBar({ signOut, user }: NavBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            Ingredients
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            Components
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meals
          </Typography>
          
          {user ? (
            <>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Hello {user.username}
              </Typography>
              <Button color="inherit" onClick={signOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}