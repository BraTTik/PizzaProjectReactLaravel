import React, { createContext, useReducer, useContext, useEffect} from 'react';
import * as actions from './AppStateActions';

const AppState = {
    currency: 'EURO',
    order: {},
    user: {},
}

const AppStateContext = createContext({});


const AppStateReducer = (state, action) => {
    switch(action.type){
        case actions.CHANGE_CURRENCY: 
            return { ...state, currency: action.payload.toUpperCase()}
        case actions.MAKE_ORDER:{
            const id = Date.now();
            const result = {...state, order: {id, ...action.payload}}
            return { ...result}
        }
        case actions.LOGIN:{
            const { id, name, last_name, email } = action.payload;
            return { ...state, user: { id, name, lastName: last_name, email } }
        }
        case actions.LOGOUT: {
            return { ...state, user: {}};
        }

        default:
            return state;
    }

}

export const loadUser = () => {
    if(sessionStorage.getItem('user')){
        const user = JSON.parse(sessionStorage.getItem('user'));
        return user
    }
    return null;
}

export const unLoadUser = () => {
    sessionStorage.removeItem('user');
}

export const AppStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppStateReducer, AppState);
    
    useEffect(()=>{
        const user = loadUser();
        if(user){
            dispatch({type: actions.LOGIN, payload: user})
        }
    }, [])
    return (
        <AppStateContext.Provider value={ {state, dispatch} }>
            { children }
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext);
}