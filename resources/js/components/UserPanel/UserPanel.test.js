import React from 'react';
import { fireEvent } from '@testing-library/react';
import { UserPanel } from './index'

jest.mock('../Select', () => ( { Select : () => <div>Select</div>}))

describe('UserPanel', () => {
    describe('renders correctly', () => {
        const mockUseCart = () => ({
            pizzas: [1, 2, 3],
            getTotalAmount: () => 3,
        })
        test('renders buttons', () => {
            const { container } = renderWithRouter((()=><UserPanel useCartHook={mockUseCart}/>))

            expect(container.innerHTML).toMatch('Login');
            expect(container.innerHTML).toMatch('Cart');
        })

        test('renders amount of items', ()=>{
            const { getByText } = renderWithRouter((()=><UserPanel useCartHook={mockUseCart}/>))

            expect(getByText("Cart").innerHTML).toMatch('3');
        })
    })
})

describe('Clicking on buttons', () => {
    const mockUseCart = () => ({
        pizzas: [],
        getTotalAmount: () => 0,
    })

    test('routes to /cart on click Cart', () => {
        const {getByText, history} = renderWithRouter((() => <UserPanel useCartHook={mockUseCart}/>));

        fireEvent.click(getByText("Cart"));
        expect(history.location.pathname).toBe('/cart')
    })

    test('routes to /login on click Login', () => {
        const { getByText, history } = renderWithRouter((() => <UserPanel useCartHook={mockUseCart}/>))

        fireEvent.click(getByText("Login"));
        expect(history.location.pathname).toBe('/login');
    })
})