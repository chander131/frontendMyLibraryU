/**
 * @module EjemploAction
 */

import {
	SET_EJEMPLO, SET_EJEMPLO_ERROR, SET_INIT_EJEMPLO,
} from '@actionsTypes/ejemplo.type';

export const setEjemploAction = () => (dispatch, getState) => {
	dispatch({ type: SET_INIT_EJEMPLO });
	const data = { nombre: 'Daniel', edad: 21 };
	try {
		dispatch({
			type: SET_EJEMPLO,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: SET_EJEMPLO_ERROR,
			payload: { message: e.message },
		});
	}
	return data;
};
