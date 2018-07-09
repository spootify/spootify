//Imports
import axios from 'axios';

//Initial State
const initialState = {
    deviceID: '',

};

//Action Types
const SET_DEVICE_ID = "SET_DEVICE_ID";
const GET_CURRENTLY_PLAYING = "GET_CURRENTLY_PLAYING";
const PAUSE_SONG = "PAUSE_SONG";
const PLAY_SONG = "PLAY_SONG";
const PREVIOUS_SONG = "PREVIOUS_SONG";
const NEXT_SONG = "NEXT_SONG";


//Action Creators
export function setDeviceID(deviceID){
    return {
        type: SET_DEVICE_ID,
        payload: deviceID
    }
}

export function getCurrentlyPlaying(){
    let currentlyPlayingInfo = axios.get('/currently/playing').then(response => {
        return response.data.data
    })
    return {
        type: GET_CURRENTLY_PLAYING,
        payload: currentlyPlayingInfo
    }
}

export function pauseSong(){
    axios.get('/pause/song').then(response => {
        return console.log('Music Paused')
    })
    return {
        type: PAUSE_SONG,
        payload: initialState
    }
}

export function playSong(){
    axios.put('/resume/track', {deviceID: initialState.deviceID}).then(response => {
        console.log("Music Resumed")
    })
    return {
        type: PLAY_SONG,
        payload: initialState
    }
}

export function skipTrack(){
    axios.post('/skip/next/track', {deviceID: initialState.deviceID}).then(response => {
        console.log("Track Skipped")
    })
    return {
        type: NEXT_SONG,
        payload: initialState
    }
}

export function previousTrack(){
    axios.post('/previous/track', {deviceID: initialState.deviceID}).then(response => {console.log("Skipped to previous track")})
    return {
        type: PREVIOUS_SONG,
        payload: initialState
    }
}


//Reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_DEVICE_ID:
            return Object.assign({}, state, {deviceID: action.payload})
        case GET_CURRENTLY_PLAYING + '_FULFILLED':
            return Object.assign({}, state, action.payload)
        case PAUSE_SONG:
            return state;
        case PLAY_SONG:
            return state;
        case NEXT_SONG:
            return state;
        case PREVIOUS_SONG:
            return state;
        default:
            return state;
    }
}