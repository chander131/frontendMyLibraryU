/* eslint-disable react/prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
	HomeOutlined,
	UserOutlined,
	GroupOutlined,
	ReadOutlined,
	HistoryOutlined,
	DatabaseOutlined,
	TagsOutlined,
} from '@ant-design/icons';

import useAuth from '@hooks/useAuth';

import './MenuSider.scss';

const MenuSider = (props) => {
	const { user: { role } } = useAuth();
	const {
		menuCollapsed,
		location: { pathname },
	} = props;
	const { Sider } = Layout;

	return (
		<Sider collapsed={menuCollapsed} className='admin-sider'>
			<Menu
				theme='dark'
				mode='inline'
				defaultSelectedKeys={[role === 'LIBRARIAN_ROLE' ? '/requested-books' : '/library']}
				selectedKeys={[pathname]}
			>
				{role === 'LIBRARIAN_ROLE' ? (
					<>
						<Menu.Item key='/requested-books'>
							<Link to={'/requested-books'}>
								<HomeOutlined />
								<span className='nav-text'>Requested books</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/users'>
							<Link to={'/users'}>
								<UserOutlined />
								<span className='nav-text'>Users</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/books'>
							<Link to={'/books'}>
								<ReadOutlined />
								<span className='nav-text'>Books</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/records'>
							<Link to={'/records'}>
								<DatabaseOutlined />
								<span className='nav-text'>Records</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/book-genres'>
							<Link to={'/book-genres'}>
								<TagsOutlined />
								<span className='nav-text'>Book genres</span>
							</Link>
						</Menu.Item>
					</>
				) : (
					<>
						<Menu.Item key='/library'>
							<Link to={'/library'}>
								<GroupOutlined />
								<span className='nav-text'>Library</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/current-books'>
							<Link to={'/current-books'}>
								<ReadOutlined />
								<span className='nav-text'>Current books</span>
							</Link>
						</Menu.Item>
						<Menu.Item key='/order-history'>
							<Link to={'/order-history'}>
								<HistoryOutlined />
								<span className='nav-text'>Order history</span>
							</Link>
						</Menu.Item>
					</>
				)}
			</Menu>
		</Sider>
	);
}

export default withRouter(MenuSider);
