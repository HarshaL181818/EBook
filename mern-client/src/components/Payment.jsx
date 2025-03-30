import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../hooks/useCart';

const stripePromise = loadStripe('pk_test_51QBMSXBuaLd4buQ1BXkHdieZeQZRkKZBwjpUDEvDnU9vaGDPaCK8SopDMtL0aCXoo7WF02c7d3hfnPupGAlhgztt00Kw8kvH3h');
const Payment = () => {

  const [cart] = useCart();
  console.log(cart);
  // calculate the checkout prices
  const cartTotal = cart.reduce((sum,item) => sum + item.price, 0)
  const totalPrice = parseFloat(cartTotal.toFixed(2));
 
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-4 py-28'>
        <Elements stripe={stripePromise}>
      <CheckoutForm totalPrice={totalPrice} cart={cart}/>
    </Elements>
    </div>
  )
}

export default Payment