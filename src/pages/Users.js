/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import useAuth from '@root/hooks/useAuth';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import styled from 'styled-components';

const initialState = {
	name: '',
	lastname: '',
	email: '',
	password: '',
	role: '',
	active: false,
};

const Users = () => {
	const { user: { token } } = useAuth();
	const [{ data: resSave }, saveUserApi] = useDataApi({
		url: `${basePath}/${apiVersion}/users`, headers: {
			Authorization: token
		}
	});
	const [{ data: resAll }, getAllUsersApi] = useDataApi({
		url: `${basePath}/${apiVersion}/users`, headers: {
			Authorization: token,
		}
	});
	const [{ data: resUpdate }, updateUserApi] = useDataApi({
		url: `${basePath}/${apiVersion}/users`, headers: {
			Authorization: token,
		}
	});
	const [user, setUser] = useState(initialState);
	const [currentAction, setCurrentAction] = useState('save');

	const getAllUsers = async () => {
		await getAllUsersApi();
	};

	const saveUser = async () => {
		await saveUserApi({
			body: user,
			method: 'POST',
		});

		setUser(initialState);
		setCurrentAction('save');
		await getAllUsers();
	};

	const editar = (userData) => {
		setUser(userData);
		setCurrentAction('update');
	};

	const updateUser = async () => {
		await updateUserApi({
			url: `${basePath}/${apiVersion}/users/${user.uid}`,
			body: user,
			method: 'PUT',
		});

		setUser(initialState);
		setCurrentAction('save');
		await getAllUsers();
	};

	const cancelUpdate = () => {
		setUser(initialState);
		setCurrentAction('save');
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<StyledUser>
			<div>
				<FormUser
					data={user}
					setData={setUser}
					typeAction={currentAction}
					onAction={currentAction === 'save' ? saveUser : updateUser}
					onCancel={cancelUpdate}
				/>
			</div>

			<div className='container-books'>
				{resAll?.ReturnData?.users?.map((dataUser, i) => (
					<div key={i}>
						<p><span>Name:</span> {dataUser.name}</p>
						<p><span>Email:</span> {dataUser.email}</p>
						<p><span>Role:</span> {dataUser.role}</p>
						<button type='button' onClick={() => editar(dataUser)}>Editar</button>
					</div>
				))}
			</div>
		</StyledUser>
	);
};

const FormUser = ({ data = {}, setData, onAction, typeAction = 'save', onCancel }) => {

	return (
		<div className='book'>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					name='name'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.name}
				/>
			</div>
			<div>
				<label htmlFor='lastname'>Lastname</label>
				<input
					id='lastname'
					type='text'
					name='lastname'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.lastname}
				/>
			</div>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='text'
					name='email'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.email}
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='text'
					name='password'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.password}
				/>
			</div>
			<div>
				<label htmlFor='role'>Role</label>
				<select
					id='role'
					name='role'
					value={data.role}
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
				>
					<option value='STUDENT_ROLE'>Student</option>
					<option value='LIBRARIAN_ROLE'>Librarian</option>
				</select>
			</div>
			<div>
				<label htmlFor='active'>Active</label>
				<input
					id='active'
					type='checkbox'
					name='active'
					onChange={({ target }) => setData({ ...data, [target.name]: target.checked })}
					checked={data.active}
				/>
			</div>
			<div>
				<button type='button' onClick={onAction}>
					{typeAction === 'save' ? 'Save' : 'Update'}
				</button>

				{typeAction !== 'save' && (
					<button type='button' onClick={onCancel}>Cancelar</button>
				)}
			</div>
		</div>
	);
};

const StyledUser = styled.div`

  .book {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    & > div {
      flex: 1;
      & > label {
        
      }

      & > input {

      }
    }

    & > div {
      & > button {
        width: 70px;
      }
    }
  }

  .container-books {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      & > :nth-child(1n + 1) {
        margin-right: 10px;
      }

      p > span {
        color: black;
        font-weight: 500;
      }
    }
  }

`;


export default Users
