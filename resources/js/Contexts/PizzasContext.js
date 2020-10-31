import React, { createContext, useReducer, useContext } from 'react'
import { withData } from '../withData';


export const actions = {
    ADD_PIZZA: 'ADD_PIZZA',
}

const PizzaReducer = (state, action) => {
    switch(action.type){
        case actions.ADD_PIZZA:
            return ({...state, pizzas: [...state.pizzas, action.payload]});
        default:
            return state;
    }
}

const PizzaContext = createContext({});

export const PizzaProvider = withData(( { children, initialState }) => {
    const [state, dispatch] = useReducer(PizzaReducer, initialState);
    return (
        <PizzaContext.Provider value = { {state, dispatch} } >
            { children }
        </PizzaContext.Provider>
    )
})

export const usePizza = () => {
    return useContext(PizzaContext);
}