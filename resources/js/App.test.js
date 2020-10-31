import React from 'react';
import App from './App';

jest.mock('./components/Home', () => ({ Home: () => <div>Home</div>}));
jest.mock('./components/Cart', () => ({ Cart: () => <div>Cart</div>}));
jest.mock('./components/Login', () => ({ Login: () => <div>Login</div>}));
jest.mock('./components/Checkout', () => ({ Checkout: () => <div>Checkout</div>}))

test('renders learn react link', () => {
  const result = renderWithRouter(()=><App />);
});

describe('routing', () => {
  test('renders Home', () => {
    const { container } = renderWithRouter((()=><App />), '/');
    expect(container.innerHTML).toMatch('Home');
  })

  test('renders Cart', () => {
    const { container } = renderWithRouter((()=><App />), '/cart');
    expect(container.innerHTML).toMatch('Cart');
  })

  test('renders Login', () => {
     const { container } = renderWithRouter((()=><App />), '/login');
     expect(container.innerHTML).toMatch('Login');
  })

  test('renders Checkout', () => {
    const { container } = renderWithRouter((() => <App />), '/checkout');

    expect(container.innerHTML).toMatch('Checkout');
  })

})
