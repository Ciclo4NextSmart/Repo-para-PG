import React, { useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Cart from './components/Cart/Cart';
import { Route, Switch } from 'react-router';
import { Home } from './pages/Home'
import { Detail } from './pages/Detail';
import { getProducts } from './redux/actions/index'
import { useDispatch } from 'react-redux'
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { Categories } from './components/Categories/Categories';
import { Profile } from './pages/Profile';
import { ShoppingCart } from './pages/ShoppingCart';
import { Users } from './components/Users/Users';
import Footer from './components/Footer/Footer';
import AdminSales from './components/AdminSales/AdminSales';
import InfoCommerce from './pages/InfoCommerce';
import DashStyles from './components/DashStyles/DashStyles';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/cart" component={ShoppingCart} />
        <Route exact path="/" component={Home} />
        <Route exact path='/categories' component={Categories} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path='/about' component={InfoCommerce} />
        <Route exact path="/admin/products" component={Dashboard} />
        <Route exact path="/admin/sales" component={AdminSales} />
      </Switch>
      <Route path="/admin" component={DashStyles} />
    </div>
  );
}

export default App;