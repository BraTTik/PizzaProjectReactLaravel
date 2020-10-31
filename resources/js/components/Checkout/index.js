import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { useAppState } from '../../Contexts/AppState';
import { AppLayout } from '../AppLayout';
import { CheckoutList } from './CheckoutList';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutContainer } from '../../styles';
import { MAKE_ORDER } from '../../Contexts/AppStateActions'
import { withRouter } from 'react-router-dom';

const Component = ({ history }) => {
    const { pizzas, getTotal } = useCart();
    const { state, dispatch } = useAppState();

    const handleSubmit = userData => {
        const data = { 
            user: { ...userData }, 
            details: {pizzas: [...pizzas], currency: state.currency, total: getTotal() }}
        console.log(data);
        dispatch({type: MAKE_ORDER, payload: data});
        history.push('/order');
    }
    return (
        <AppLayout>
            <CheckoutContainer>
                <CheckoutForm submit={handleSubmit}/>
                <CheckoutList pizzas={pizzas} currency={state.currency} total={getTotal().toFixed(2)}/>
            </CheckoutContainer>
        </AppLayout>
    )
}

export const Checkout = withRouter(Component);