import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import {
	getAccessTokenApi,
	getRefreshTokenApi,
	refreshAccessTokenApi,
	logout,
} from '@api/auth';

export const AuthContext = createContext();

const checkUserLogin = (setUser) => {
	const accessToken = getAccessTokenApi();
	
	if (!accessToken) {
		const refreshToken = getRefreshTokenApi();

		if (!refreshToken) {
			logout();
			setUser({ user: null, isLoading: false });
		} else {
			refreshAccessTokenApi(refreshToken);
		}
	} else {
		setUser({ user: { ...jwtDecode(accessToken), token: accessToken }, isLoading: false });
	}
};

const AuthProvider = (props) => {
	// eslint-disable-next-line react/prop-types
	const { children } = props;
	const [user, setUser] = useState({
		user: null,
		isLoading: true,
	});

	useEffect(() => {
		checkUserLogin(setUser);
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
