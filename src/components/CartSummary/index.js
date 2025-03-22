// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalRupee = 0

      cartList.forEach(each => {
        totalRupee += each.quantity * each.price
      })

      return (
        <div className="summary-card">
          <h1 className="total">
            Order Total:<span> Rs {totalRupee}/-</span>
          </h1>
          <p className="total-items">{cartList.length} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
