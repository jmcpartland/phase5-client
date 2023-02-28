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

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {login} = useContext(UserContext)

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
        fetch('http://code.projectlatitude.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            if (!user.error) {
                login(user)
                // handleClose(true) // Doesn't work when Login is full screen
                navigate('/')
            } else {
                setEmail("")
                setPassword("")
                setError(user.error)
            }
        })
    }

    const showAlert = () => {
      if (error == "") {
      } else {
        return (
          <>
            <br/>
            <Alert severity="error">{error}</Alert>
          </>
        )
      }
    }

    
    return (
        // <>
        //     <form onSubmit={handleSubmit}>
        //         <label>email:</label>
        //         <input 
        //             type="text"
        //             id="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         /> <br/>
        //         <label>Password:</label>
        //         <input 
        //             type="password"
        //             id="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         /> <br/>
        //         <input type="submit" />
        //     </form>
        //     <ul>
        //         <h3>{error}</h3>
        //     </ul>
        // </>

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
            Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                    autoComplete="password"
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
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Login
            </Button>
            {/* <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="#" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid> */}
            </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
            
            {showAlert()}

        </Container>
        </ThemeProvider>



    )
}
export default Login