import React, { useState, useEffect } from 'react';
import { PizzaContainer, PizzaContainerFooter, PizzaContainerTitle, PizzaDescription, Price } from '../../styles';
import { Button } from '../Button';
import { useAppState } from '../../Contexts/AppState';
import { useCart } from '../../Contexts/CartContext';
import PropTypes from 'prop-types';

export const PizzaCard = ( { name, price, description, image, useAppStateHook = useAppState } ) => {
    const { state } = useAppStateHook();
    const { addPizza, pizzas } = useCart();

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [isDisplayAmount, setIsDisplayAmount] = useState(false);

    useEffect(()=>{
        const found = pizzas.find( pizza => pizza.name === name);
        if(found){
            setIsDisplayAmount(true);
            setAmount(found.amount);
        }else{
            setAmount(0);
            setIsDisplayAmount(false);
        }
    }, [pizzas])

    const imageStyle = { display: `${isImageLoading ? 'none' : 'block'}`}

    const imageLoading = () => {
        return (<div style={{width: '272px', height: '266px'}}></div>)
    }
    return(
        <PizzaContainer>
            { isImageLoading && imageLoading()  }
            <img onLoad={()=>{ setIsImageLoading(false)}} src={image} style={imageStyle} alt={name}/>
            <PizzaContainerTitle>
                {name}
            </PizzaContainerTitle>
            <PizzaDescription>
                {description}
            </PizzaDescription>
            <PizzaContainerFooter>
                <Price>
                    {
                    state.currency === 'EURO' ?
                        `€${price.EURO}` :
                        `$${price.USD}`
                    }
                    {
                        isDisplayAmount && ` ✖ ${amount}`
                         
                    }
                </Price>
                <div>
                    <Button onClick={ () => addPizza({name, price, description, image}) } >
                        Add to cart
                    </Button>
                </div>
            </PizzaContainerFooter>
        </PizzaContainer>
    )
}

PizzaCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.shape({
        euro: PropTypes.number,
        usd: PropTypes.number
    })
}

