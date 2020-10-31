import React from 'react';
import { render } from '@testing-library/react';
import { PizzaCard } from './index';

const mockStateHook = () => ({
    state: {
        currency: 'USD'
    }
})


test('PizzaCard renders correctly', () => {
    const pizza = {
        name: 'Pizza',
        description: 'description pizza',
        image: '/img/src',
        price: {
            EURO: 10,
            USD: 7
        }
    }
    const {container, getByAltText} = render(<PizzaCard {...pizza} useAppStateHook={mockStateHook}/>)
    expect(container.innerHTML).toMatch('Pizza');
    expect(container.innerHTML).toMatch('description pizza')
    expect(container.innerHTML).toMatch('$7');
    expect(getByAltText("Pizza")).toHaveAttribute('src', '/img/src');
})