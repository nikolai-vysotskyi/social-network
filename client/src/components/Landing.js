import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();

    const handleRegisterClick = () => {
        history.push('/register');
    };

    const handleLoginClick = () => {
        history.push('/login');
    };

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            minHeight='calc(100vh - 64px - 32px)'
            padding={2}
            style={{
                backgroundImage: 'url(https://source.unsplash.com/random/1600x900?social)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                color: 'white'
            }}
        >
            <Box bgcolor='rgba(0, 0, 0, 0.5)' p={2} borderRadius={2}>
                <Typography variant='h2' gutterBottom>
                    Welcome to Our Social Network
                </Typography>
                <Typography variant='h5' gutterBottom>
                    Connect with friends and the world around you.
                </Typography>
                <Box marginTop={2}>
                    <Button variant='contained' color='primary' onClick={handleRegisterClick} style={{ marginRight: '10px' }}>
                        Register
                    </Button>
                    <Button variant='outlined' style={{ borderColor: 'white', color: 'white' }} onClick={handleLoginClick}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Landing;