import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import todos from './todos.reducer';
import selected from './selected.reducer';

const reducers = combineReducers({
    todos,
    selected
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;