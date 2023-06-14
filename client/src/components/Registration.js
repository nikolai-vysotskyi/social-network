import React, {useContext, useState} from 'react';
import {Button, TextField, Container, Typography} from '@mui/material';
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useContext(AuthContext);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newUser = {
                name,
                email,
                password
            };
            const body = JSON.stringify(newUser);
            const res = await axios.post('/api/auth/register', body);
            auth.login(res.data.token, res.data.userId)
            window.location = '/';
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Container maxWidth='xs'>
            <Typography variant='h4' align='center'>Registration</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    name='name'
                    autoComplete='name'
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
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
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default Registration;