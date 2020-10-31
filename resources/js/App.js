import React from 'react';
import { Home } from './components/Home';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { Switch, Route } from 'react-router-dom';
import { Order } from './components/Order';
import { Profile } from './components/Profile';


function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/checkout" exact>
        <Checkout />
      </Route>
      <Route path="/order" exact>
        <Order />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
    </Switch>
  );
}

export default App;
