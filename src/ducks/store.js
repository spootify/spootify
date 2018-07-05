import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import user from './user';
import results from './results';

const reducers = combineReducers({
	user,
	results
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()))