import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';

const reducers = combineReducers({
	user
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware())));