/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Button } from 'antd';

import './BookGenres.scss';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import useAuth from '@root/hooks/useAuth';

const initialState = {
	gender: '',
	color: ''
};

const BookGenres = () => {
	const { user: { token } } = useAuth();
	const [{ data }, fetchData] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token
	} });
	const [
		{ data: responseSave },
		fetchDataSaveGender
	] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token,
	} });
	const [
		{ data: responseUpdate },
		fetchDataUpdateGender
	] = useDataApi({ url: `${basePath}/${apiVersion}/genderBook`, headers: {
		Authorization: token,
	} });

	const [gender, setGender] = useState(initialState);
	const [currentAction, setCurrentAction] = useState('save');

	const getGenders = async () => {
		await fetchData();
	};

	const saveGender = async () => {
		await fetchDataSaveGender({
			body: gender,
			method: 'POST',
		});

		setGender(initialState);
		setCurrentAction('save');
		await getGenders();
	};

	const editar = (book) => {
		setGender(book);
		setCurrentAction('update');
	};


	const updateGender = async () => {
		await fetchDataUpdateGender({
			url: `${basePath}/${apiVersion}/genderBook/${gender._id}`,
			body: gender,
			method: 'PUT',
		});

		setGender(initialState);
		setCurrentAction('save');
		await getGenders();
	};

	const cancelUpdate = () => {
		setGender(initialState);
		setCurrentAction('save');
	};

	useEffect(() => {
		getGenders();
	}, []);

	return (
		<Col>
			<FormBookGenres
				data={gender}
				setData={setGender}
				typeAction={currentAction}
				onAction={currentAction === 'save' ? saveGender : updateGender}
				onCancel={cancelUpdate}
			/>

			<table className='table'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Gender</th>
						<th scope='col'>Color</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>

				<tbody>
					{data?.ReturnData.map((gender, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{gender.gender}</td>
							<td>
								<span
									style={{ backgroundColor: gender.color }}
									className='badge badge-pill badge-primaryName'
								>{gender.color}</span>
							</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-info btn-sm'
									onClick={() => editar(gender)}
								>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Col>
	);
};

const FormBookGenres = ({ data = {}, setData, onAction, typeAction = 'save', onCancel }) => {
	return (
		<div className='form-row'>
			<div className='form-group col-md-2'>
				<label htmlFor='title'>Gender name</label>
				<input
					id='gender'
					type='text'
					name='gender'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.gender}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='author'>Gender color</label>
				<input
					id='color'
					type='color'
					name='color'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.color}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2 align-self-end'>
				<button type='button' onClick={onAction} className='btn btn-outline-info btn-sm'>
					{typeAction === 'save' ? 'Save' : 'Update'}
				</button>

				{typeAction !== 'save' && (
					<button type='button' onClick={onCancel} className='btn btn-outline-secondary btn-sm ml-2'>
						Cancelar
					</button>
				)}
			</div>
		</div>
	);
};

export default BookGenres;
