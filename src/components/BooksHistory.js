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
		<StyledBookHistory>
			<div className='book-history'>
				{['librarian_earring', 'librarian'].includes(filter) && (
					<p>Student</p>
				)}
				<p>Book</p>
				<p>Date departureDate</p>
				{['user_history', 'librarian'].includes(filter) && (
					<p>Date deliverDate</p>
				)}
				{<p>Status</p>}
				{<p>Request stock</p>}
				{filter === 'librarian_earring' && (
					<div>
						<p>Options</p>
					</div>
				)}
			</div>
			{resAll?.ReturnData.map((history, i) => (
				<div key={i} className='book-history'>
					{['librarian_earring', 'librarian'].includes(filter) && (
						<p>{history.user.name}</p>
					)}
					<p>{history.book.title}</p>
					<p>{moment.unix(history.departureDate).format('d/MM/yyyy')}</p>
					{['user_history', 'librarian'].includes(filter) && (
						<p>{moment.unix(history.deliverDate).format('d/MM/yyyy')}</p>
					)}
					{<p>{history.status.toLowerCase()}</p>}
					{<p>{history.stock}</p>}
					{filter === 'librarian_earring' && (
						<div>
							<button type='button' onClick={() => takeABook(history._id)}>Take a book</button>
						</div>
					)}
				</div>
			))}
		</StyledBookHistory>
	)
}

const StyledBookHistory = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .book-history {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    & > :nth-child(1n + 1) {
      flex: 1;
    }
  }
`;

export default BooksHistory
