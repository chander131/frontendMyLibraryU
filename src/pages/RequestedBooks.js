import BooksHistory from '@root/components/BooksHistory'
import React from 'react'

const RequestedBooks = () => {
	return (
		<div>
			<h3>Requested books</h3>
			<BooksHistory filter='librarian_earring' />
		</div>
	)
}

export default RequestedBooks
