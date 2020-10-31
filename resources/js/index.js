import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PizzaProvider } from './Contexts/PizzasContext'
import { AppStateProvider } from './Contexts/AppState';
import { CartProvider } from './Contexts/CartContext';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <CartProvider>
          <PizzaProvider>
              <App />
          </PizzaProvider>
        </CartProvider>
      </AppStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

