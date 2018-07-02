import axios from 'axios';

const initialState = {
	user: {
		id: '',
		access_token: '',
		refresh_token: ''
	}
};

const GET_USER = 'GET_USER';

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER + '_FULFILLED':
			return Object.assign({}, state, { user: action.payload });
		default:
			return state;
	}
}

export function getUser() {
	const userData = axios.get('/auth/me')
		.then((resp) => {
			return {
				id: resp.data[0].spotify_id,
				access_token: resp.data[1],
				refresh_token: resp.data[2],
			}
		})
		.catch((err) => console.error(err));

	return {
		type: GET_USER,
		payload: userData
	}
}