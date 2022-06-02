import BooksHistory from '@root/components/BooksHistory'
import React from 'react'

const CurrentBooks = () => {
	return (
		<div>
			<h3>CurrentBooks</h3>
			<BooksHistory filter='user_earring' />
		</div>
	)
}

export default CurrentBooks
