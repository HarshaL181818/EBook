import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { FaPaypal } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalPrice, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(typeof totalPrice !== 'number' || totalPrice < 1) {
            console.log("Price is not a number or less than 1")
            return;
        }
        axiosSecure.post('/create-payment-intent', {totalPrice})
        .then( res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    }, [totalPrice, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
    
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
    
        if (error) {
            setCardError(error.message);
        } else {
            setCardError("Success!");
    
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: user?.displayName || 'anonymous',
                            email: user?.email || 'unknown',
                        },
                    },
                },
            );
    
            if (confirmError) {
                console.log(confirmError);
            }
    
            if (paymentIntent.status === "succeeded") {
                const paymentInfo = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    totalPrice,
                    quantity: cart.length,
                    status: "Order pending",
                    bookName: cart.map(item => item.bookTitle),
                    cartItems: cart.map(item => item._id),
                    bookItems: cart.map(item => item.bookId),
                    createdAt: new Date().toISOString(),
                };
    
                   
                // Send payment info to the backend
                try {
                    const response = await axiosSecure.post('/save-payment-info', paymentInfo);
                    console.log(response.data);
    
                    // Clear the cart after successful payment
                    await axiosSecure.delete('/clear-cart', { data: { email: user.email } });
                    console.log('Cart cleared successfully');
    
                    // Set payment success state
                    setPaymentSuccess(true);
                    // Redirect to cart page after a short delay
                    setTimeout(() => {
                        navigate('/order'); // Adjust the path as needed
                    }, 2000); // Redirect after 2 seconds
                } catch (error) {
                    console.error("Error saving payment info:", error);
                }
            }
        }
    };
    return (
        <div className='flex flex-col sm:flex-row justify-start items-start gap-8'>

            {/* Display the success message if payment was successful */}
            {paymentSuccess && (
                <div className="alert alert-success">
                    Payment Successful! Redirecting to Orders...
                </div>
            )}

            {/* left side */}
            <div className='md:w-1/2 w-full space-y-3'>
                <h4 className='text-lg font-semibold'>Order Summary</h4>
                <p>Total Price: ${totalPrice}</p>
                <p>Number of Items: {cart.length}</p>
            </div>
            {/* right side */}
            <div className='md:w-1/3 w-full space-y-5 card bg-base-100 max-w-sm shrink-0 shadow-2xl px-4 py-8'>
                <h4 className='text-lg font-semibold'>Process Your Payment!</h4>
                <h5 className='font-medium'>Credit/Debit Card</h5>
                {/* stripe form */}

                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 btn-primary w-full text-white'>
                        Pay
                    </button>
                </form>
                {
                    cardError ? <p className='text-red-600 italic text-xs'>{cardError}</p> : ""
                }

                {/* paypal  */}
                <div className='mt-5 text-center'>
                    <hr />
                    <button type="submit" className='btn btn-sm mt-5 bg-orange-500 text-white'>
                        <FaPaypal/> Pay with Paypal
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm
