import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { WithAuthenticatorProps } from '@aws-amplify/ui-react';

interface INavBarProps {
  signOut: WithAuthenticatorProps['signOut'];
  user: WithAuthenticatorProps['user'];
}

export default function NavBar({ signOut, user }: INavBarProps) {
  return (
    <AppBar
      position="fixed"
    >
      <Toolbar
        id='nav-bar'
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
          }}
        >
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
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0.1,
              marginRight: '30px'
              }}
            >
              CALO
            </Typography>
          </Link>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
          }}
        >
          {user ? (
            <>
              <Typography
              variant="h6"
              component="div"
              sx={{
                mr: 2
                }}
              >
                Hello&nbsp;
                 {user.attributes?.email}
              </Typography>
              <Button
                color="inherit"
                onClick={signOut}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
              >Login
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}