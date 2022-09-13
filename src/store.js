import {createStore} from 'redux';

const initialState = {
    items: []
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_ITEMS') {
        state = {...state, items: action.items}
    }
    if (action.type === 'NEW_ITEM') {
        state = {...state, items: [...state.items, action.items]}
    }
    if (action.type === 'DELETE_ITEM') {
        state = {...state, items: state.items.filter((item,idx) => item.id !== action.id)}
    }
    return state
}

const store = createStore(reducer);

export default store
