import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import jwtDecode from 'jwt-decode';

import { signInApi } from '@api/user'
import { emailValidation, minLengthValidation } from '@utils/formValidation'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@utils/constants';

import './LoginForm.scss';

export default function LoginForm(props) {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [formValid, setFormValid] = useState({
		email: false,
		password: false,
	});

	const changeForm = ({ target: { name, value } }) => setInputs({ ...inputs, [name]: value });

	const inputValidation = ({ target, target: { type, name } }) => {
		if(type === 'email') setFormValid({ ...formValid, [name]: emailValidation(target) });
		if(type === 'password') setFormValid({ ...formValid, [name]: minLengthValidation(target, 6) });
	}

	const login = async (e) => {
		e.preventDefault();

		const result = await signInApi(inputs);
		console.log(result);
		if(result.ReturnCode !== 200) {
			notification.error({ message: result.ReturnMsg });
		} else {
			const { accessToken, refreshToken } = result.ReturnData;
			localStorage.setItem(ACCESS_TOKEN, accessToken);
			localStorage.setItem(REFRESH_TOKEN, refreshToken);

			notification.success({ message: 'Login correcto' });

			const { role } = await jwtDecode(accessToken);

			window.location.href = role === 'STUDENT_ROLE' ? '/library' : '/requested-books';
		}
	};

	return (
		<Form className='login-form' onChange={changeForm} onSubmitCapture={login}>
			<Form.Item>
				<Input
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					type='email'
					name='email'
					placeholder='Email'
					className='login-form__input'
					onChange={inputValidation}
					value={inputs.email}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
					type='password'
					name='password'
					placeholder='Password'
					className='login-form__input'
					onChange={inputValidation}
					value={inputs.password}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' className='login-form__button'>
					Sign in
				</Button>
			</Form.Item>
		</Form>
	);
}
