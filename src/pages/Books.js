/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import useAuth from '@root/hooks/useAuth';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import styled from 'styled-components';

const initialState = {
	title: '',
	author: '',
	publishedYear: 0,
	gender: '',
	stock: 0,
};

const Books = () => {
	const { user: { token } } = useAuth();
	const [{ data:resSave }, saveBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book`, headers: {
			Authorization: token
		}
	});
	const [{ data:resAll }, getAllBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book`, headers: {
			Authorization: token,
		}
	});
	const [{ data:resUpdate }, updateBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book`, headers: {
			Authorization: token,
		}
	});
	const [bookCreate, setBookCreate] = useState(initialState);
	const [currentAction, setCurrentAction] = useState('save');

	const getAllBooks = async () => {
		await getAllBookApi();
	};

	const saveBook = async () => {
		await saveBookApi({
			body: bookCreate,
			method: 'POST',
		});

		setBookCreate(initialState);
		setCurrentAction('save');
		await getAllBooks();
	};

	const editar = (book) => {
		setBookCreate(book);
		setCurrentAction('update');
	};

	const updateBook = async () => {
		await updateBookApi({
			url: `${basePath}/${apiVersion}/book/${bookCreate._id}`,
			body: bookCreate,
			method: 'PUT',
		});

		setBookCreate(initialState);
		setCurrentAction('save');
		await getAllBooks();
	};

	const cancelUpdate = () => {
		setBookCreate(initialState);
		setCurrentAction('save');
	};

	useEffect(() => {
		getAllBooks();
	}, []);

	return (
		<StyledBook>
			<div>
				<FormBook
					data={bookCreate}
					setData={setBookCreate}
					typeAction={currentAction}
					onAction={currentAction === 'save' ? saveBook : updateBook}
					onCancel={cancelUpdate}
				/>
			</div>

			<table className='table'>
				<thead className='thead-dark'>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Title</th>
						<th scope='col'>Author</th>
						<th scope='col'>Published year</th>
						<th scope='col'>Gender</th>
						<th scope='col'>Stock</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>

				<tbody>
					{resAll?.ReturnData.map((book, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.publishedYear}</td>
							<td>{book.gender}</td>
							<td>{book.stock}</td>
							<td>
								<button
									type='button'
									className='btn btn-outline-info btn-sm'
									onClick={() => editar(book)}
								>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</StyledBook>
	);
};

const FormBook = ({ data = {}, setData, onAction, typeAction = 'save', onCancel }) => {

	return (
		<div className='form-row'>
			<div className='form-group col-md-2'>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.title}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='author'>Author</label>
				<input
					id='author'
					type='text'
					name='author'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.author}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='publishedYear'>Published year</label>
				<input
					id='publishedYear'
					type='text'
					name='publishedYear'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.publishedYear}
					className='form-control form-control-sm'
				/>
			</div>
			<div className='form-group col-md-2'>
				<label htmlFor='gender'>Gender</label>
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
				<label htmlFor='stock'>Stock</label>
				<input
					id='stock'
					type='text'
					name='stock'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.stock}
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

const StyledBook = styled.div`

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

export default Books
