/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PoweroffOutlined,
} from '@ant-design/icons';

import useAuth from '@root/hooks/useAuth';

import LogoWeb from '@components/LogoWeb';

import { logout } from '@api/auth';

import './MenuTop.scss';

export default function MenuTop(props) {
	const { menuCollapsed, setMenuCollapsed } = props;
	const { user: { role } } = useAuth();
	const logoutUser = () => {
		logout();
		window.location.reload();
	};

	return (
		<div className='menu-top'>
			<div className='menu-top__left'>
				<Link to={role === 'LIBRARIAN_ROLE' ? '/requested-books' : '/library'}>
					<LogoWeb menuCollapsed={menuCollapsed} classLogo={'menu-top__left-logo'} />
				</Link>
				<Button
					type='link'
					onClick={() => setMenuCollapsed(!menuCollapsed)}
				>
					{menuCollapsed ? (
						<MenuUnfoldOutlined />
					) : (
						<MenuFoldOutlined />
					)}
				</Button>
			</div>
			<div className='menu-top__right'>
				<Button type='link' onClick={logoutUser}>
					<PoweroffOutlined />
				</Button>
			</div>
		</div>
	);
}
