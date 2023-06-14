import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Box, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Login from './components/Login';
import Feed from './components/Feed';
import Landing from './components/Landing';
import AuthContext from "./contexts/AuthContext";
import axios from "axios";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    axios.defaults.baseURL = 'http://localhost:3005';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const auth = useContext(AuthContext);

    useEffect(async () => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401) {
                auth.logout();
            }
            console.log("Error occurred:", error);
            toast.error(`${error.response.status}: ${error.response?.data?.message || 'Unknown error'}`);
            return Promise.reject(error);
        });

        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const name = JSON.parse(localStorage.getItem('name'));
        const balance = JSON.parse(localStorage.getItem('balance'));
        if (token && userId) {
            auth.login(token, userId, true)

            if (name && balance) {
                auth.updateUserInfo(name, balance)
            } else {
                auth.updateUserInfo(null, null)
            }

            try {
                const res = await axios.get('http://localhost:3005/api/user');
                if (res?.data?.name && res?.data?.balance) {
                    auth.updateUserInfo(res.data.name, res.data.balance)
                }
            } catch (e) {
                console.log(e)
            }

        } else {
            auth.login(null, null, true)
        }
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>
                <Header/>
                <Box style={{minHeight: 'calc(100vh - 64px - 64px)'}}>
                    <Switch>
                        <Route path='/' exact component={auth.isUpdate && (!!auth.token ? Feed : Landing)}/>
                        <Box style={{paddingTop: 64}}>
                            {
                                auth.isUpdate &&
                                (!auth.token && (<>
                                        <Route path='/register' component={Registration}/>
                                        <Route path='/login' component={Login}/>
                                    </>)
                                )
                            }
                        </Box>
                    </Switch>
                </Box>
                <Footer/>
            </Router>
        </ThemeProvider>
    );
}

export default App;