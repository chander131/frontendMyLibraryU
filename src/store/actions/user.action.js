/**
 * @module UserAction
 */

import {
	SET_USER_INFO,
	SET_USER_INFO_SUCCESS,
	SET_USER_INFO_ERROR,
} from '@actionsTypes/user.type';

export const setInfoUser = async (userData) => (dispatch, getState) => {
	dispatch({ type: SET_USER_INFO });
	try {
		dispatch({
			type: SET_USER_INFO_SUCCESS,
			payload: userData,
		});
	} catch (e) {
		dispatch({
			type: SET_USER_INFO_ERROR,
			payload: { message: e.message },
		});
	}
};
