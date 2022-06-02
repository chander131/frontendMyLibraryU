import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/img/png/logo.png';

import './LogoWeb.scss';

function LogoWeb({ size = 'small', classLogo = '', menuCollapsed }) {
	return (
		<div className={`logo-web-${size} ${classLogo}`}>
			<img src={logo} alt='Daniel Alexander Elías' />
			{!menuCollapsed && (
				<div className={`box-creator-${size}`}>
					<p>Power by Daniel E.</p>
				</div>
			)}
		</div>
	);
}

LogoWeb.propTypes = {
	size: PropTypes.string,
	classLogo: PropTypes.string,
	menuCollapsed: PropTypes.bool,
};

export default LogoWeb;
