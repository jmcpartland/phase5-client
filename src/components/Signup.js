import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function SignUp({ handleClose }) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errorsList, setErrorsList] = useState([])
  const navigate = useNavigate()
  const {signup} = useContext(UserContext);

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:4000">
          Long Covid Support
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

  const handleSubmit = (e) => {
      e.preventDefault()
      fetch('http://code.projectlatitude.com/signup', { // configuration object
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password,
              password_confirmation: passwordConfirmation
          })
      })
      .then(res => res.json())
      .then(user => {
          if (!user.errors) {
              signup(user)
              handleClose(true)
              navigate('/')
          } else {
              setFirstName("")
              setLastName("")
              setEmail("")
              setPassword("")
              setPasswordConfirmation("")
              const errorLis = user.errors.map(e =>
                   <li key={e}>{e}</li>
              )
              setErrorsList(errorLis)
          }
      })
  }

  const showAlert = () => {
    if (errorsList.length !== 0) {
      return (
        <>
          <br/><Alert severity="error">{errorsList}</Alert>
        </>
      )
    }}


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  value={lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  value={email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  name="password"
                  value={password}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  required
                  fullWidth
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
          { showAlert() }
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;