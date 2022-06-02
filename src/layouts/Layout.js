/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import moment from 'moment';

import { version } from '../../package.json';

import SignIn from '@pages/SignIn/SignIn';
import MenuTop from '@components/MenuTop';
import MenuSider from '@components/MenuSider';

import useAuth from '@hooks/useAuth';

import './Layout.scss';

const LayoutApp = (props) => {
	const [menuCollapsed, setMenuCollapsed] = useState(false);
	const { routes } = props;
	const { Header, Content, Footer } = Layout;
	const { user, isLoading } = useAuth();

	if (!user && !isLoading) {
		return (
			<>
				<Route path='/login' component={SignIn} />
				<Redirect to='/login' />
			</>
		);
	}

	if (user && !isLoading) {
		return (
			<Layout>
				<MenuSider menuCollapsed={menuCollapsed} />
				<Layout
					className='layout-admin'
					style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}
				>
					<Header className='layout-admin__header'>
						<MenuTop
							menuCollapsed={menuCollapsed}
							setMenuCollapsed={setMenuCollapsed}
						/>
					</Header>
					<Content className='layout-admin__content'>
						<LoadRoutes routes={routes} />
					</Content>
					<Footer className='layout-admin__footer'>
						<p>
							{`Copyright © Daniel Elias ${moment().format('YYYY')}®`}
						</p>
						<p>V{version}</p>
					</Footer>
				</Layout>
			</Layout>
		);
	}

	return null;
}

const LoadRoutes = ({ routes }) => {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
		</Switch>
	);
};

export default LayoutApp;
