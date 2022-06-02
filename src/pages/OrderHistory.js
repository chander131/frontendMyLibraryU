import BooksHistory from '@root/components/BooksHistory'
import React from 'react'

const OrderHistory = () => {
	return (
		<div>
			<h3>Order history</h3>
			<BooksHistory filter='user_history' />
		</div>
	)
}

export default OrderHistory
