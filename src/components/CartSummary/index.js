// Write your code here
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentMethodsList = [
  {id: 1, type: 'Card'},
  {id: 2, type: 'Net Banking'},
  {id: 3, type: 'UPI'},
  {id: 4, type: 'Wallet'},
  {id: 5, type: 'Cash on Delivery'},
]

const CartSummary = () => {
  const [paymentType, setPaymentType] = useState('')
  const [isOrder, setOrder] = useState(false)

  const changePayment = e => {
    setPaymentType(e.target.value)
  }
  const removePayment = () => {
    setPaymentType('')
  }

  const confirmOrder = () => {
    setOrder(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, toggleOrder, removeAllCartItems} = value
        let totalRupee = 0

        cartList.forEach(each => {
          totalRupee += each.quantity * each.price
        })

        const GoToPurchase = () => {
          removeAllCartItems()
        }

        return (
          <div className="summary-card">
            <h1 className="total">
              Order Total:<span> Rs {totalRupee}/-</span>
            </h1>
            <p className="total-items">{cartList.length} items in cart</p>
            <Popup
              trigger={<button type="button">Checkout</button>}
              modal
              nested
            >
              {close => (
                <div className="popup">
                  {isOrder ? (
                    <div>
                      <p className="order-placed-msg">
                        Your order has been placed successfully
                      </p>
                      <Link to="/products">
                        <button className="btn primary" onClick={GoToPurchase}>
                          Go to Purchase
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <h1>Payments Details</h1>
                      <p>PayMent Method</p>
                      <div className="method">
                        {paymentMethodsList.map(each => (
                          <div key={each.id}>
                            <input
                              onChange={changePayment}
                              name="payment"
                              id={each.id}
                              type="radio"
                              value={each.type}
                              disabled={each.type !== 'Cash on Delivery'}
                            />
                            <label htmlFor={each.id}>{each.type}</label>
                          </div>
                        ))}
                      </div>
                      <h2>Order Details</h2>
                      <p>Quantity: {cartList.length}</p>
                      <p>Total Price: Rs {totalRupee}/-</p>
                      <button
                        className="btn"
                        onClick={() => {
                          close()
                          removePayment()
                        }}
                        type="button"
                      >
                        cancel
                      </button>
                      <button
                        className="btn"
                        disabled={paymentType === ''}
                        onClick={confirmOrder}
                        type="button"
                      >
                        Confirm Order
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
