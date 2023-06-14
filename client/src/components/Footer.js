import React from 'react';
import {AppBar, Box, Typography} from '@mui/material';

function Footer() {
    return (
        <AppBar position='static'>
            <Box py={3}>
                <Typography variant='body2' color='text.secondary' align='center'>
                    © 2023 Social Network. All rights reserved.
                </Typography>
            </Box>
        </AppBar>
    );
}

export default Footer;