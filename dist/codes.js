module.exports = {
    store : `
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './../reducers';
const persistConfig = {
    key: 'root',
    timeout: null,
    storage,
    whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore() {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor }
}`,
    root_reducer : `
import { combineReducers } from 'redux';
import defaultReducer from './default';

const appReducer = combineReducers({
    defaultReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export default rootReducer;
    `,
    default_reducer : `
const initialState = {};
export default function defaultReducer(state = initialState, action) {
    return state;
}
    `,
    action : `
    // here you can import your HTTP service
    const {ACTION_NAME} = "{ACTION_NAME}";

    // the method you should call when calling api (loading)
    function {ACTION_METHOD}Waiting() {
        return {
            type : {ACTION_NAME},
            {ACTION_KEY}_waiting : true,
            {ACTION_KEY}_response : {},
            {ACTION_KEY}_error : {}
        }
    }
    
    // the method you should call when api call response is success
    function {ACTION_METHOD}Success(response) {
        return {
            type: {ACTION_NAME},
            {ACTION_KEY}_waiting : false,
            {ACTION_KEY}_response : response,
            {ACTION_KEY}_error : {}
        }
    }
    
    // the method you should call when api call response is error
    function {ACTION_METHOD}Error(error) {
        return {
            type : {ACTION_NAME},
            {ACTION_KEY}_waiting : false,
            {ACTION_KEY}_response : {},
            {ACTION_KEY}_error : error
        }
    }

    // the method you should call when you want to make store empty for this action
    function {ACTION_METHOD}Empty() {
        return {
            type : {ACTION_NAME},
            {ACTION_KEY}_waiting : false,
            {ACTION_KEY}_response : {},
            {ACTION_KEY}_error : {}
        }
    }
    
    function {ACTION_METHOD}(data) {
        return (dispatch) => {
            // uncomment this section to call api method and dispatch it using redux-thunk
            /* dispatch({ACTION_METHOD}Waiting());
            const post = Http.POST('auth/send_verification_code',data); // Http is the method that calls API for you (you can use axios)
            post.then((response) => {
                if (response !== undefined)
                    dispatch({ACTION_METHOD}Success(response));
            }).catch((error) => {
                dispatch({ACTION_METHOD}Error(error));
            }); */
        }
    }

    export {
        {ACTION_NAME},
        {ACTION_METHOD},
        {ACTION_METHOD}Empty
    }
    `,
    reducer : `
import {{ACTION_NAME}} from "../actions/{FILE_NAME}";

const initialState = {
    {ACTION_KEY}_error :{},
    {ACTION_KEY}_waiting : false,
    {ACTION_KEY}_success : {},
};

export default function {METHOD_NAME}Reducer(state = initialState, action){
    return {
            ...state,
            {ACTION_KEY}_waiting : action.{ACTION_KEY}_waiting,
            {ACTION_KEY}_success : action.{ACTION_KEY}_response,
            {ACTION_KEY}_error : action.{ACTION_KEY}_error
    }
}
    `
}