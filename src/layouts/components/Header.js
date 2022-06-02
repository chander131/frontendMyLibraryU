import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Header = ({ }) => {
	return (
		<Contenedor>
			<header>
				<p>Header</p>
			</header>
		</Contenedor>
	);
};

Header.propTypes = {

};

const Contenedor = styled.div`
	background: mediumpurple;
    display: flex;
    justify-content: center;
    padding: 5px;
`;

export default Header;
