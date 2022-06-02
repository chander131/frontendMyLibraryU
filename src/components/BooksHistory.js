/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import useAuth from '@root/hooks/useAuth';
import useDataApi from '@root/hooks/useDataApi';
import { apiVersion, basePath } from '@root/api/config';
import styled from 'styled-components';
import moment from 'moment';

const BooksHistory = ({ filter }) => {
	const { user: { token, uid, role } } = useAuth();

	const [{ data: resAll }, getAllBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/bookHistory`, headers: {
			Authorization: token,
		}
	});

	const [{ data: resReturnBook }, returnBookApi] = useDataApi({
		url: `${basePath}/${apiVersion}/bookHistory`, headers: {
			Authorization: token,
		}
	});

	const getBooks = async () => {
		let filters = {};

		if (filter === 'user_history') {
			filters = { ...filters, userId: uid };
		} else if (filter === 'user_earring') {
			filters = { ...filters, userId: uid, status: 'EARRING' };
		} else if (filter === 'librarian_earring') {
			filters = { ...filters, status: 'EARRING' };
		} else if (filter === 'librarian') {
			filters = {};
		}

		await getAllBookApi({
			params: filters,
		});
	};

	const takeABook = async (id) => {
		await returnBookApi({
			url: `${basePath}/${apiVersion}/bookHistory/${id}`,
			method: 'PUT',
			body: { 'status': 'DELIVERED' }
		});

		await getBooks();
	};

	useEffect(() => {
		getBooks();
	}, [filter]);

	return (
		<table className='table'>
			<thead className='thead-dark'>
				<tr>
					<th scope='col'>#</th>
					{['librarian_earring', 'librarian'].includes(filter) && (
						<th scope='col'>Student</th>
					)}
						
					<th scope='col'>Book</th>
					<th scope='col'>Date departureDate</th>
					{['user_history', 'librarian'].includes(filter) && (
						<th scope='col'>Date deliverDate</th>
					)}
					<th scope='col'>Status</th>
					<th scope='col'>Request stock</th>
					{filter === 'librarian_earring' && (
						<th scope='col'>Options</th>
					)}
				</tr>
			</thead>
			<tbody>
				{resAll?.ReturnData.map((history, i) => (
					<tr key={i}>
						<th scope='row'>{i + 1}</th>
						{['librarian_earring', 'librarian'].includes(filter) && (
							<td>{history.user.name}</td>
						)}
						<td>{history.book.title}</td>
						<td>{moment.unix(history.departureDate).format('d/MM/yyyy')}</td>
						{['user_history', 'librarian'].includes(filter) && (
							<td>{moment.unix(history.deliverDate).format('d/MM/yyyy')}</td>
						)}
						{<td>{history.status.toLowerCase()}</td>}
						{<td>{history.stock}</td>}
						{filter === 'librarian_earring' && (
							<td>
								<button
									type='button'
									onClick={() => takeABook(history._id)}
									className='btn btn-outline-info btn-sm'
								>Take a book</button>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default BooksHistory;
