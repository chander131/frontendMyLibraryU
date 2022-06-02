import {
	SET_USER_INFO,
	SET_USER_INFO_SUCCESS,
	SET_USER_INFO_ERROR,
} from '@actionsTypes/user.type';

export const initialState = {
	isFetching: false,
	isSuccess: false,
	isError: false,
	message: '',
	userInfo: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_USER_INFO:
		return {
			...state,
			isFetching: true,
		};
	case SET_USER_INFO_SUCCESS:
		return {
			...state,
			isFetching: false,
			isSuccess: true,
			isError: false,
			data: action.payload,
		};
	case SET_USER_INFO_ERROR:
		return {
			...state,
			isFetching: false,
			isSuccess: false,
			isError: true,
			error: action.payload,
		};
	default: return state;
	}
};

export default reducer;
