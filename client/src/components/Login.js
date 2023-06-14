import axios from "axios";
import React, {useContext, useState} from 'react';
import {Button, TextField, Container, Typography} from '@mui/material';
import AuthContext from "../contexts/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useContext(AuthContext);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const user = {
                email,
                password
            };
            const body = JSON.stringify(user);
            const res = await axios.post('/api/auth/login', body);
            auth.login(res.data.token, res.data.userId)

            window.location = '/';
        } catch (e) { console.log(e) }
    };

    return (
        <Container maxWidth='xs'>
            <Typography variant='h4' align='center'>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                >
                    Login
                </Button>
            </form>
        </Container>
    );
}

export default Login;

