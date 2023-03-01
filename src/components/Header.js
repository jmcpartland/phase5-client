import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import AccountMenu from './AccountMenu';
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom"
import PostForm from './PostForm';

function Header() {
  const {logout, loggedIn} = useContext(UserContext);
  const navigate = useNavigate()
  const title = "Long Covid Support Community"

  const sections = [
    { title: 'Home', url: '/' },
    { title: 'My Posts', url:'/posts'},
    { title: 'All Posts', url: '/all-posts' },
    { title: 'Resources', url: '/resources' },
    // { title: 'Statistics', url: '#' },
  ];

  const handleLogout = () => {
      fetch('https://code.projectlatitude.com/logout', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
          logout()
          navigate('/')
      })
  }

  const LogInOrOut = () => {
    if (loggedIn) {
      return <Button onClick={handleLogout} variant="outlined" size="small">Logout</Button>
    } else {
      return <LoginModal />
    }
  }

  const SignupOrAccount = () => {
    if (loggedIn) {
      return (
        <>
          <Button variant="outlined" size="small" href="/post-form">Create Post</Button>,
          <AccountMenu />
        </>
      )
      } else {
      return <SignupModal />
    }
  }

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#ffffff',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  const showSections = () => {
    if (loggedIn) {
      return (
        <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto', bgcolor: '#63a5db' }}
        >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
      ))}
      </Toolbar>
      )
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Toolbar sx={{ height: 80, borderBottom: 2, borderColor: 'divider', bgcolor: '#4682B4' }}>
          <Typography
            component="h2"
            variant="h4"
            color="#ffffff"
            align="left"
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
          {LogInOrOut()}
          {SignupOrAccount()}
        </Toolbar>
          {showSections()}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default Header;