import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Dev
// import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Prod
import moment from 'moment';
import { ConfigProvider } from 'antd';

import AuthProvider from '@providers/AuthProvider';
import { CacheProvider } from '@contexts/CacheContext';
import store from './store';

import router from '@config/routes';

import './App.scss';

import enUS from 'antd/lib/locale-provider/es_ES';
import 'moment/locale/es';

const App = () => {
	moment.locale('es');
	return (
		<AuthProvider>
			<ReduxProvider store={store}>
				<Router>
					<CacheProvider>
						<ConfigProvider locale={enUS}>
							<Switch>
								{router.map((route, index) => (
									<RouteWithSubRoutes key={index} {...route} />
								))}
							</Switch>
						</ConfigProvider>
					</CacheProvider>
				</Router>
			</ReduxProvider>
		</AuthProvider>
	);
};

const RouteWithSubRoutes = (route) => {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => (
				<route.component routes={route.routes} {...props} />
			)}
		/>
	);
}

export default App;
