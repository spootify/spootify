import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import results from './results';
import player from './player';

const reducers = combineReducers({
	user,
	results,
	player
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware())))