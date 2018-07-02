import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import user from './user';

const reducers = combineReducers({
	user
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()))