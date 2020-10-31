import React from 'react';
import { Home } from './index';
import { render } from '@testing-library/react';

jest.mock('../PizzaCard', () => ({PizzaCard: ({name}) => <div>{name}</div>}));
jest.mock('../AppLayout.js', () => ({AppLayout: ({children}) => <div>AppLayout { children }</div>}))

const mockPizzaHook = () => ({ pizzas: [{name: 'Pizza'}, {name: 'Pizza'}]})

test('renders correctly', () => {
    const { getAllByText, container } = render(<Home usePizzaHook={mockPizzaHook}/>)

    expect(container.innerHTML).toMatch('AppLayout');
    expect(getAllByText("Pizza").length).toBe(2);
})