import React, { useState, useCallback } from 'react';
import AuthContext from '../contexts/AuthContext';
import axios from "axios";

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isUpdate, setUpdate] = useState(false);

    const updateUserInfo = useCallback((userName, userBalance) => {
        setName(userName);
        setBalance(userBalance);
        localStorage.setItem("name", JSON.stringify(userName));
        localStorage.setItem("balance", JSON.stringify(userBalance));
    },[]);

    const login = useCallback((token, userId, update) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));

        if(token && userId){
            axios.defaults.headers.common['x-auth-token'] = token;
        }

        if (update){
            setUpdate(true)
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.setItem("token", JSON.stringify(null));
        localStorage.setItem("userId", JSON.stringify(null));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: token,
                userId: userId,
                name: name,
                balance: balance,
                login: login,
                logout: logout,
                updateUserInfo: updateUserInfo,
                isUpdate: isUpdate
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
