import React from 'react';
import { AppLayout } from './AppLayout';
import { render, fireEvent } from '@testing-library/react';

jest.mock('./UserPanel', () => ({UserPanel: ()=> <div>User Panel</div>}))

describe('AppLayout', () => {

    test('renders correctly', () => {
        const { container, history } = renderWithRouter((()=><AppLayout />));

        expect(container.innerHTML).toMatch('Mama Mia');
        expect(container.innerHTML).toMatch('User Panel');
    })


    test('clicks on title', () => {
        const { getByText, history } = renderWithRouter(( () => <AppLayout />));
        fireEvent.click(getByText("Mama Mia"));
        expect(history.location.pathname).toBe('/');
    })
})
