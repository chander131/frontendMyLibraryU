import React, { useEffect, useState } from 'react';

import useAuth from '@root/hooks/useAuth';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import styled from 'styled-components';

const initialState = {
	title: '',
	author: '',
	gender: '',
};

const Library = () => {
	const { user: { token } } = useAuth();

	const [{ data: resAll }, getAllBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book`, headers: {
			Authorization: token,
		}
	});

	const [{ data: resSearchAll }, getAllSearchBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book/search`, headers: {
			Authorization: token,
		}
	});

	const [{ data:gendersAll }, getGenderBooks] = useDataApi({
		url: `${basePath}/${apiVersion}/genderBook`, headers: {
			Authorization: token
		}
	});

	const [{ data:resAskBook }, askBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/book/ask`, headers: {
			Authorization: token
		}
	});

	const [filters, setFilters] = useState(initialState);
	const [typeShow, setTypeShow] = useState('all');

	const searchBooks = async () => {
		setTypeShow('search');

		await getAllSearchBookApi({
			params: filters
		});
	};

	const cleanFilters = async () => {
		setFilters(initialState);
		setTypeShow('all');

		await getAllBooks();
	};

	const getAllBooks = async () => {
		await getAllBookApi();
	};

	const askBook = async (id) => {
		await askBookApi({
			url: `${basePath}/${apiVersion}/book/ask/${id}`,
		});

		setTypeShow('all');
		await getAllBooks();
	};

	useEffect(() => {
		getAllBooks();
		getGenderBooks();
	}, []);

	return (
		<StyledBook>
			<div className='container-filters'>
				Filtros:

				<div className='form-row'>
					<div className='form-group col-md-3'>
						<label htmlFor='title'>Title</label>
						<input
							className='form-control form-control-sm'
							id='title'
							type='text'
							name='title'
							onChange={({ target }) => setFilters({ ...filters, [target.name]: target.value })}
							value={filters.title}
						/>
					</div>

					<div className='form-group col-md-3'>
						<label htmlFor='author'>Author</label>
						<input
							className='form-control form-control-sm'
							id='author'
							type='text'
							name='author'
							onChange={({ target }) => setFilters({ ...filters, [target.name]: target.value })}
							value={filters.author}
						/>
					</div>

					<div className='form-group col-md-3'>
						<label htmlFor='gender'>Role</label>
						<select
							className='form-control form-control-sm'
							id='gender'
							name='gender'
							value={filters.gender}
							onChange={({ target }) => setFilters({ ...filters, [target.name]: target.value })}
						>
							{gendersAll?.ReturnData.map(({ gender }, i) => (
								<option key={i} value={gender}>{gender}</option>
							))}
						</select>
					</div>

					<div className='form-group col-md-3 align-self-end'>
						<button type='button' className='btn btn-outline-info' onClick={searchBooks}>Search</button>
						<button
							type='button'
							className='btn btn-outline-secondary ml-2' onClick={cleanFilters}>Clean filters</button>
					</div>
				</div>
			</div>

			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Title</th>
						<th scope='col'>Author</th>
						<th scope='col'>Gender</th>
						<th scope='col'>Stock</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{(typeShow === 'all' ? resAll : resSearchAll)?.ReturnData.map((book, i) => (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.gender}</td>
							<td>{book.stock}</td>
							{book.stock > 0 && (
								<td>
									<button
										className='btn btn-success'
										type='button'
										onClick={() => askBook(book._id)}>
										Ask
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</StyledBook>
	);
};

const StyledBook = styled.div`

  .container-filters {

  }

  .filters {
    display: flex;

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

export default Library
