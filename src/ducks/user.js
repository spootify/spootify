import axios from 'axios';

const initialState = {
	user: {}
};

const GET_USER = 'GET_USER';

export default function reducer(state=initialState, action) {
	switch (action.type) {
		case GET_USER:
			return Object.assign({}, state, {user: action.payload});
		default:
			return state;
	}
}

export function getUser() {
	const user = {};
	axios.get('/auth/spotify')
		 .then((resp) => {
			 console.log(resp);
			 user.id = resp.data[0]
		 })
		 .catch((err) => console.error(err));

	return {
		type: GET_USER,
		payload: user
	}
}