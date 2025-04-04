import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {!showEmptyView ? (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  onClick={() => removeAllCartItems()}
                  className="remove-btn"
                >
                  Remove all
                </button>

                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <CartSummary />
              </div>
            ) : (
              <EmptyCartView />
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
