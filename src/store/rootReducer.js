import { combineReducers } from 'redux';
import ejemplo from '@reducers/ejemplo.reducer';
import user from '@reducers/user.reducer';

export default combineReducers({
	ejemplo,
	user,
});
