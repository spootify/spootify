import axios from 'axios';

const initialState = {
	deviceId: '',
	currentSong: {
		albumUri: '',
		trackUri: '',
	}
};

const GET_USER = 'GET_USER';
const GET_DEVICE_ID = "GET_DEVICE_ID";
const CHANGE_CURRENT_SONG = 'CHANGE_CURRENT_SONG';



export function getUser() {
	const userData = axios.get('/auth/me')
	.then((resp) => {
		return axios.get(`/spotify/user/${resp.data[0].spotify_id}`).then(res => {
			return {
				id: resp.data[0].spotify_id,
				access_token: resp.data[1],
				refresh_token: resp.data[2],
				displayName: res.data.body.display_name,
				// image: res.data.body.images[0].url
			}
		}).catch((err) => console.error(err));
		
	})
	
	
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

export function changeCurrentSong(albumUri, trackUri){
	return {
		type: CHANGE_CURRENT_SONG,
		payload: {
			albumUri: albumUri,
			trackUri: trackUri
		}
	}
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER + '_FULFILLED':
			return Object.assign({}, state, action.payload );
		case GET_DEVICE_ID + '_FULFILLED':
			return Object.assign({}, state, {deviceId: action.payload});
		case CHANGE_CURRENT_SONG:
			return Object.assign({}, state, {currentSong: {albumUri: action.payload.albumUri, trackUri: action.payload.trackUri}})
		default:
			return state;
	}
}