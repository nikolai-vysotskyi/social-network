import React from 'react';

const AuthContext = React.createContext({
    token: null,
    userId: null,
    name: null,
    balance: null,
    isUpdate: false,
    updateUserInfo: () => {},
    login: (token, userId) => {},
    logout: () => {},
});

export default AuthContext;