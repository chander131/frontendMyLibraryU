import {
	SET_INIT_EJEMPLO, SET_EJEMPLO, SET_EJEMPLO_ERROR,
} from '@actionsTypes/ejemplo.type';

export const initialState = {
	init: false,
	data: null,
	hasError: false,
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_INIT_EJEMPLO:
		return {
			...state,
			init: true,
		};
	case SET_EJEMPLO:
		return {
			...state,
			init: false,
			data: action.payload,
		};
	case SET_EJEMPLO_ERROR:
		return {
			...state,
			init: false,
			data: null,
			hasError: true,
			error: action.payload,
		};
		// case SET_RESTAR_EJEMPLO:
		//     return initialState;
	default: return state;
	}
};

export default reducer;
