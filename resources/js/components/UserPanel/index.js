import React from 'react';
import { MainButton, NavPanel, NavPanelItem, CounterContainer } from '../../styles';
import { useAppState } from '../../Contexts/AppState';
import { CHANGE_CURRENCY } from '../../Contexts/AppStateActions';
import { Select } from '../Select';
import { Link } from 'react-router-dom';
import { useCart } from '../../Contexts/CartContext';

export const UserPanel = ( {useCartHook = useCart}) => {
    const { pizzas, getTotalAmount } = useCartHook();
    const { state, dispatch } = useAppState();

    const changeHandler = (e) => {
        dispatch({
            type: CHANGE_CURRENCY,
            payload: e.target.value,
        })
    }
    return (
        <NavPanel>
            <NavPanelItem>
                <Select options={['EURO', 'USD']} changeHandler={changeHandler} activeValue={state.currency}/>
            </NavPanelItem>
            <NavPanelItem>
                {state.user.id ? (
                    <MainButton as={Link} to="/profile">
                        {state.user.name}
                    </MainButton>
                ) : (
                <MainButton as={Link} to="/login">
                    Login
                </MainButton>
                ) }
            </NavPanelItem>
            <NavPanelItem>
                <CounterContainer>
                    { pizzas.length ? getTotalAmount() + ' ' : ''} 
                </CounterContainer>
                <MainButton as={Link} to="/cart">
                    Cart
                </MainButton>
            </NavPanelItem>
        </NavPanel>
    )
}