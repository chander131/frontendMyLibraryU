/* eslint-disable no-tabs */
// Layout
// Layout
import Layout from '@root/layouts/Layout';

// Admin Pages
import SignIn from '@pages/SignIn';
import BookGenres from '@pages/BookGenres';
import Books from '@pages/Books';
import Users from '@pages/Users';
import Library from '@pages/Library';
import CurrentBooks from '@pages/CurrentBooks';
import OrderHistory from '@pages/OrderHistory';
import Records from '@pages/Records';
import RequestedBooks from '@pages/RequestedBooks';

// Other
import Error404 from '@pages/Error404';

const routes = [
	{
		path: '/',
		exact: false,
		component: Layout,
		routes: [
			{
				path: '/requested-books',
				exact: true,
				component: RequestedBooks,
			},
			{
				path: '/login',
				exact: true,
				component: SignIn,
			},
			{
				path: '/book-genres',
				exact: true,
				component: BookGenres,
			},
			{
				path: '/books',
				exact: true,
				component: Books,
			},
			{
				path: '/users',
				exact: true,
				component: Users,
			},
			{
				path: '/library',
				exact: true,
				component: Library,
			},
			{
				path: '/current-books',
				exact: true,
				component: CurrentBooks,
			},
			{
				path: '/order-history',
				exact: true,
				component: OrderHistory,
			},
			{
				path: '/records',
				exact: true,
				component: Records,
			},
			{
				path: '/requested-books',
				exact: true,
				component: RequestedBooks,
			},
			{
				component: Error404,
			}
		],
	},
];

export default routes;
