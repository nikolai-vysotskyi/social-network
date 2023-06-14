import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, MenuItem, IconButton, Hidden, Menu, Divider} from '@mui/material';
import AuthContext from "../contexts/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
    const auth = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Toolbar>
                <Box style={{flexGrow: 1, display: 'flex'}}>
                    <Typography variant='h6'>
                        <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
                            Social Network
                        </Link>
                    </Typography>

                    <Hidden mdDown>
                        {(!!auth.token && auth.isUpdate) && (
                            <Box ml={1.5}>
                                <Button ml={2.5} color='inherit' component={Link} to='/'>Home</Button>
                            </Box>
                        )}
                    </Hidden>
                </Box>
                {(!!auth.token && auth.isUpdate) && (
                    <Hidden mdUp>
                        <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMenu}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <>
                                <MenuItem component={Link} to='/' onClick={handleClose}>
                                    <Box ml={1} mr={1}>
                                        <AccountBoxIcon/>
                                    </Box>
                                    <Typography variant='h6' mr={1}>
                                        @{auth.name} (${auth.balance})
                                    </Typography>
                                </MenuItem>
                                <Divider/>
                                <MenuItem component={Link} to='/' onClick={handleClose}>
                                    <Box ml={1} mr={1}>
                                        <HomeIcon/>
                                    </Box>
                                    <Typography mr={1}>
                                        Home
                                    </Typography>
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={() => {
                                    auth.logout();
                                    handleClose();
                                }}>
                                    <Box ml={1} mr={1}>
                                        <LogoutIcon/>
                                    </Box>
                                    <Typography mr={1}>
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </>
                        </Menu>
                    </Hidden>
                )}
                {(!auth.token && auth.isUpdate) && (
                    <>
                        <Button color='inherit' component={Link} to='/register'>Register</Button>
                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                    </>
                )}
                <Hidden mdDown>
                    {(!!auth.token && auth.isUpdate) && (
                        <>
                            <Box ml={1}>
                                <Button color='inherit'>
                                    <Typography variant='subtitle1'>
                                        @{auth.name} (${auth.balance})
                                    </Typography>
                                    <Box ml={1.5} mr={1}>
                                        <AccountBoxIcon/>
                                    </Box>
                                </Button>
                            </Box>
                            <Button color='inherit' onClick={() => auth.logout()}>
                                <LogoutIcon/>
                            </Button>
                        </>
                    )}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default Header;