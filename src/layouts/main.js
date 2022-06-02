import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '@layouts/components/Header';
import Footer from '@layouts/components/Footer';

const Main = ({ children }) => {
	const [actualPath, setActualPath] = useState();
	// const [pathname, setPathname] = useState([]);
	const location = useLocation();

	useEffect(() => {
	}, []);

	return (
		<Body>
			<Header />
			<div className='main-container'>
				{children}
			</div>
			<Footer />
		</Body>
	);
};

Main.propTypes = {
	children: PropTypes.node.isRequired,
};

const Body = styled.div`
	position: relative;
	// height: 100vh;
	.main-container {
		margin-left: var(--nav-width);
	}
`;

export default Main;
