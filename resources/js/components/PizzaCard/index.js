import React, { useState } from 'react';
import { PizzaContainer, PizzaContainerFooter, PizzaContainerTitle, PizzaDescription, Price } from '../../styles';
import { Button } from '../Button';
import { useAppState } from '../../Contexts/AppState';
import { useCart } from '../../Contexts/CartContext';
import PropTypes from 'prop-types';

export const PizzaCard = ( { name, price, description, image, useAppStateHook = useAppState } ) => {
    const { state } = useAppStateHook();
    const { addPizza } = useCart();
    const [isImageLoading, setIsImageLoading] = useState(true);
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

