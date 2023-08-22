import { Link } from 'react-router-dom';
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
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, marginRight: '30px'  }}>
              Home
            </Typography>
          </Link>
          <Link
            to="/Ingredients"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, marginRight: '30px'  }}>
              Ingredients
            </Typography>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.1 }}>
            #
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            #
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