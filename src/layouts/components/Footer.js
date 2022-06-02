import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

moment.locale('es');

const Footer = () => {
	return (
		<Component>
			<div>
				{/* <img src={} alt='' /> */}
				<p>
					{`Copyright © Jada-Live ${moment().format('YYYY')}®`}
				</p>
				<p>V.1.0</p>
			</div>
		</Component>
	);
};

const Component = styled.div`
    position: absolute;
    align-items: flex-end;
    margin-top: 2em;
    width: 100%;
    & > div {
        background: #FFFFFF;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4em;
        padding: 1em;
        transition: 1s;
        & > p{
            margin: 0px;
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 15px;
            text-align: right;
            color: #3E4958;
        }
    }
    @media screen and (max-width: 570px) {
        & > div {
            & > p{
                &:nth-child(2){
                    display: none;
                }
            }
        }
    }
`;

export default Footer;
