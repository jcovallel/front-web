import { createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
    user: ""
};

const reducer = (state=initialState, action) => {
    if (action.type === "SAVEUSER"){
        return{
            ...state,
            user: action.user
        }
    } else if (action.type === "DELETEUSER"){
        return {
            ...state,
            user: ""
        }
    }
    return state;
};


export default createStore(reducer, {user: ""}, composeWithDevTools(applyMiddleware(), persistState()));