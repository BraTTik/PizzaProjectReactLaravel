import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyCartContainer, EmptyCartInfo } from '../../styles';


export const EmptyCart = () => {
    return(
        <EmptyCartContainer>
            <EmptyCartInfo>
                Your cart is empty.
                <Link to="/">
                    <img src="/img/empty.svg" alt='' width="150"/>
                </Link>
                <Link to="/">
                    Get your best pizza
                </Link>
            </EmptyCartInfo>
        </EmptyCartContainer>
    )
}