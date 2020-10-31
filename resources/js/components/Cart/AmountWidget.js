import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MainButton } from '../../styles'


const Element = styled.div`
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
`


export const AmountWidget = ( {add, substr, amount} ) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <MainButton onClick = { substr }>-</MainButton>
            <Element>{amount}</Element>
            <MainButton onClick = { add }>+</MainButton>
        </div>
    )
}

AmountWidget.propTypes = {
    add: PropTypes.func,
    substr: PropTypes.func,
    amount: PropTypes.number
}

