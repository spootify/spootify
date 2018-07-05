const initialState = {
    results: {
        albums: [],
        artists: [],
        playlists: []
    }
}

const UPDATE_RESULTS = 'UPDATE_RESULTS'

export function updateResults(results){
    return {
        type: UPDATE_RESULTS,
        payload: results
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_RESULTS:
            return Object.assign({}, state, {results: action.payload})
        default:
            return state;
    }
}