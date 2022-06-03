/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import useAuth from '@root/hooks/useAuth';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';

const initialState = {
	name: '',
	lastname: '',
	email: '',
	password: '',
	role: 'STUDENT_ROLE',
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
		<div>
			<div>
				<FormUser
					data={user}
					setData={setUser}
					typeAction={currentAction}
					onAction={currentAction === 'save' ? saveUser : updateUser}
					onCancel={cancelUpdate}
				/>
			</div>

			<table className='table'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Name</th>
						<th scope='col'>Email</th>
						<th scope='col'>Role</th>
						<th scope='col'>Options</th>
					</tr>
				</thead>
				<tbody>
					{resAll?.ReturnData?.users?.map((dataUser, i) => (
						<tr key={i}>
							<th scope='row'>{i + 1}</th>
							<td>{dataUser.name}</td>
							<td>{dataUser.email}</td>
							<td>{dataUser.role}</td>
							<td>
								<button
									type='button'
									onClick={() => editar(dataUser)}
									className='btn btn-outline-info btn-sm'
								>Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='container-books'>
			</div>
		</div>
	);
};

const FormUser = ({ data = {}, setData, onAction, typeAction = 'save', onCancel }) => {

	return (
		<div className='form-row'>
			<div className='form-group col-md-2'>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					name='name'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.name}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='lastname'>Lastname</label>
				<input
					id='lastname'
					type='text'
					name='lastname'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.lastname}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='text'
					name='email'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.email}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='text'
					name='password'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.password}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='role'>Role</label>
				<select
					id='role'
					name='role'
					value={data.role}
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					className='form-control form-control-sm'
				>
					<option value='STUDENT_ROLE'>Student</option>
					<option value='LIBRARIAN_ROLE'>Librarian</option>
				</select>
			</div>
			<div className='form-group form-check align-self-end ml-4'>
				<input
					id='active'
					type='checkbox'
					name='active'
					onChange={({ target }) => setData({ ...data, [target.name]: target.checked })}
					checked={data.active}
					className='form-check-input'
				/>
				<label htmlFor='active' className='form-check-label'>
					Active
				</label>
			</div>

			<div className='form-group col-md-2 align-self-end'>
				<button className='btn btn-outline-info btn-sm' type='button' onClick={onAction}>
					{typeAction === 'save' ? 'Save' : 'Update'}
				</button>

				{typeAction !== 'save' && (
					<button className='btn btn-outline-secondary btn-sm ml-2' type='button' onClick={onCancel}
					>Cancelar</button>
				)}
			</div>
		</div>
	);
};

export default Users
