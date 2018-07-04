import axios from 'axios';

<<<<<<< HEAD
const initialState = {
	deviceId: ''
};
=======
const initialState = {};
>>>>>>> master

const GET_USER = 'GET_USER';
const GET_DEVICE_ID = "GET_DEVICE_ID";


<<<<<<< HEAD

export function getUser() {
	const userData = axios.get('/auth/me')
	.then((resp) => {
		return axios.get(`/spotify/user/${resp.data[0].spotify_id}`).then(res => {
			return {
				id: resp.data[0].spotify_id,
				access_token: resp.data[1],
				refresh_token: resp.data[2],
				displayName: res.data.body.display_name,
				image: res.data.body.images[0].url
			}
		}).catch((err) => console.error(err));
		
	})
	
	
=======
export default function reducer(state = initialState, action) {
	console.log(action.type);
	switch (action.type) {
		case GET_USER + '_FULFILLED':
			console.log(action.payload);
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
};

export function getUser() {
	const userData = axios.get('/auth/me')
						  .then((resp) => {
							  return axios.get(`/spotify/user/${resp.data[0].spotify_id}`)
										  .then(res => {
											  return {
												  id           : resp.data[0].spotify_id,
												  access_token : resp.data[1],
												  refresh_token: resp.data[2],
												  displayName  : res.data.body.display_name,
												  // image        : res.data.body.images[0].url
											  }
										  }).catch((err) => console.error(err));
						  });


>>>>>>> master
	return {
		type   : GET_USER,
		payload: userData
	}
}

export function getDeviceId(){
	let deviceId = axios.get('/available/devices').then(response => {
		return response.data
	})
	return {
		type: GET_DEVICE_ID,
		payload: deviceId
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER + '_FULFILLED':
			return Object.assign({}, state, action.payload );
		case GET_DEVICE_ID + '_FULFILLED':
			return Object.assign({}, state, {deviceId: action.payload});
		default:
			return state;
	}
}