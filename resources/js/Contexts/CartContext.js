import React, { createContext, useEffect, useContext, useState} from 'react';
import { useAppState } from '../Contexts/AppState';

const CartContext = createContext({});

const savePizzas = (pizzas) => {
    localStorage.setItem("pizzas", JSON.stringify(pizzas));
}

export const CartProvider = ({children}) => {
    const [pizzas, setPizzas] = useState([]);
    const { state } = useAppState();

    useEffect(()=>{
        try{
            const storedPizzas = localStorage.getItem('pizzas');
            const parsedPizzas = storedPizzas ? JSON.parse(storedPizzas) : [];
            setPizzas(parsedPizzas);
        }catch(err){}
    }, [])

    const addPizza = ( pizza ) => {
        const found = pizzas.find( item => item.name === pizza.name);
        if(!found){
            const newPizza = { ...pizza, amount: 1}
            setPizzas([...pizzas, newPizza]);
            savePizzas([...pizzas, newPizza]);
        }else{
            found.amount++;
            setPizzas([...pizzas]);
            savePizzas([...pizzas]);
        }
    }

    const removePizza = ( pizza ) => {
        let found = pizzas.find( item => item.name === pizza.name);
        if(Number(found.amount) - 1 === 0){
            const filtered = pizzas.filter( item => item.name !== pizza.name)
            setPizzas(filtered)
            savePizzas(filtered);
        }else{
            found.amount--;
            setPizzas([...pizzas])
            savePizzas([...pizzas]);
        }
    }

    const getTotalAmount = () => {
        return pizzas.reduce((total, current) => (total + current.amount), 0);
    }

    const getTotal = () => {
        return pizzas.reduce((total, current) => {
            return Number(current.amount) * current.price[state.currency] + total
        }, 0)
    }

    const clearCart = () => {
        setPizzas([]);
        savePizzas([]);
    }

    return (
        <CartContext.Provider
            value = {{
                pizzas,
                addPizza,
                removePizza,
                getTotalAmount,
                getTotal,
                clearCart,
            }}
        >
            { children }
        </CartContext.Provider>
    )
}

export const useCart =  () => {
    return useContext(CartContext);
}