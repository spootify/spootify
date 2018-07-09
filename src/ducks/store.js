import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import user from './user';
import results from './results';
import player from './player';

const reducers = combineReducers({
	user,
	results,
	player
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()))