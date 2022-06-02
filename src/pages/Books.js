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

			<div className='container-books'>
				{resAll?.ReturnData.map((book, i) => (
					<div key={i}>
						<p><span>Title:</span> {book.title}</p>
						<p><span>Author:</span> {book.author}</p>
						<p><span>Gender:</span> {book.gender}</p>
						<button type='button' onClick={() => editar(book)}>Editar</button>
					</div>
				))}
			</div>
		</StyledBook>
	);
};

const FormBook = ({ data = {}, setData, onAction, typeAction = 'save', onCancel }) => {

	return (
		<div className='book'>
			<div>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.title}
				/>
			</div>
			<div>
				<label htmlFor='author'>Author</label>
				<input
					id='author'
					type='text'
					name='author'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.author}
				/>
			</div>
			<div>
				<label htmlFor='publishedYear'>Published year</label>
				<input
					id='publishedYear'
					type='text'
					name='publishedYear'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.publishedYear}
				/>
			</div>
			<div>
				<label htmlFor='gender'>Gender</label>
				<input
					id='gender'
					type='text'
					name='gender'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.gender}
				/>
			</div>
			<div>
				<label htmlFor='stock'>Stock</label>
				<input
					id='stock'
					type='text'
					name='stock'
					onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
					value={data.stock}
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
