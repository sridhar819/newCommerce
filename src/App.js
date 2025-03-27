import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    isOrderPlaced: false,
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const cartItem = cartList.find(each => each.id === id)

      if (cartItem.quantity > 1) {
        return {
          cartList: cartList.map(each =>
            each.id === id ? {...each, quantity: each.quantity - 1} : each,
          ),
        }
      }
      return {
        cartList: cartList.filter(each => each.id !== id),
      }
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const cartItem = cartList.find(each => each.id === product.id)

      if (cartItem) {
        return {
          cartList: cartList.map(each =>
            each.id === product.id
              ? {...each, quantity: product.quantity + each.quantity}
              : each,
          ),
        }
      }
      return {
        cartList: [...cartList, {...product}],
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  toggleOrder = () => {
    this.setState(pre => ({isOrderPlaced: !pre.isOrderPlaced}))
  }

  render() {
    const {cartList, isOrderPlaced} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          isOrderPlaced,
          toggleOrder: this.toggleOrder,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
