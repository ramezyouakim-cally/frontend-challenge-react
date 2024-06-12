/* eslint-disable @typescript-eslint/no-explicit-any */
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index.js';
import { save, load } from 'redux-localstorage-simple';

const composeEnhancers = typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const middlewareEnhancer = applyMiddleware(
    save(), // Saving middleware
);

const enhancer = composeEnhancers(
    middlewareEnhancer,
);

const store = createStore(
    reducer,
    load(), // Loading middleware
    enhancer,
);


export default store;
