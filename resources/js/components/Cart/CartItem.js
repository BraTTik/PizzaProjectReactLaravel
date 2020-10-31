import React from 'react';
import { } from '../../styles';
import PropTypes from 'prop-types';
import { useCart } from '../../Contexts/CartContext';
import { CartItemContainer, CartItemContainerDescription} from '../../styles'
import { AmountWidget } from './AmountWidget';

export const CartItem = ( {pizza} ) => {
    const { addPizza, removePizza } = useCart();
    return (
        <CartItemContainer>
            <CartItemContainerDescription>
                <img src={pizza.image} alt=''/>
                <div>
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                </div>

            </CartItemContainerDescription>
            <AmountWidget add={() => addPizza(pizza)} substr={() => removePizza(pizza)} amount={pizza.amount}/>
        </CartItemContainer>
    )
}

CartItem.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    amount: PropTypes.number
}