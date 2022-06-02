import BooksHistory from '@root/components/BooksHistory'
import React from 'react'

const Records = () => {
	return (
		<div>
			<h3>Records</h3>
			<BooksHistory filter='librarian' />
		</div>
	)
}

export default Records
