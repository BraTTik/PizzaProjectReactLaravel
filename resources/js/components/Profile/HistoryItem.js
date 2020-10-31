import React from 'react';
import { Total, HistoryItemContainer } from '../../styles';
import moment from 'moment';



export const HistoryItem = ({id, details, created_at}) => {
    const { total, pizzas, currency} = JSON.parse(details);
    const date = moment(created_at, moment.ISO_8601);
    return (
        <HistoryItemContainer>
            <h2>Order #{id}</h2>
            <time dateTime={created_at}>{moment().format('Do MMMM YYYY')}</time>
            <ul>
                { pizzas.map( (pizza, i) => {
                    return <li key={pizza.name + i}>
                        {pizza.amount} ✖ {pizza.name}
                    </li>
                })}
            </ul>
            <Total>Total: {currency === 'EURO' ? '€' : '$'}{total}</Total>
        </HistoryItemContainer>
    )
}