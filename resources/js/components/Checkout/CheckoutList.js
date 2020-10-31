import React from 'react';
import { CheckoutListContainer, Total } from '../../styles';


export const CheckoutList = ( { pizzas, currency, total }) => {
    return ( 
        <CheckoutListContainer>
            <h3>You are going to get:</h3>
            <ul>
                {pizzas.map( (pizza, i) => (
                    <li key={pizza.name + i + 'listitem'}>{pizza.amount} &#10006; {pizza.name}</li>
                ))}
            </ul>
            <Total>Total: {currency === 'EURO' ? '€' : '$'}{total}</Total>
        </CheckoutListContainer>

    )
}