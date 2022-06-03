import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Tabs } from 'antd';

import RegisterForm from '@components/RegisterForm';
import LoginForm from '@components/LoginForm';
import LogoWeb from '@components/LogoWeb';

import useAuth from '@root/hooks/useAuth';

import { getAccessTokenApi } from '@api/auth';

import './SignIn.scss';

const SignIn = () => {
	const { user } = useAuth();
	const { Content } = Layout;
	const { TabPane } = Tabs;

	if (getAccessTokenApi()) {
		return <Redirect to={user?.role ? '/library' : '/requested-books'} />;
	}

	return (
		<Layout className='sign-in'>
			<Content className='sign-in__content'>
				<h1 className='sign-in__content-logo'>
					<LogoWeb size='middle' />
				</h1>

				<div className='sign-in__content-tabs'>
					<Tabs type='card'>
						<TabPane tab={<span>Login</span>} key='1'>
							<LoginForm />
						</TabPane>
						{/* <TabPane tab={<span>Nuevo usuario</span>} key='2'>
								<RegisterForm />
						</TabPane> */}
					</Tabs>
				</div>
			</Content>
		</Layout>
	);
};

export default SignIn;
