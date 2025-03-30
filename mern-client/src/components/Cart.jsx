import React, { useContext, useState } from 'react';
import useCart from '../hooks/useCart';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { AuthContext } from '../contects/AuthProvider';
//import { Link } from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItm, setcartItm] = useState([]);

  const navigate = useNavigate();


  // Calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle increase function
  const handleIncrease = (item) => {
    fetch(`http://localhost:5000/cart-option/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    }).then(res => res.json()).then(data => {
      const updatedCart = cartItm.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1
          };
        }
        return cartItem;
      });
      refetch();
      setcartItm(updatedCart);
    });

    refetch();
  };

  // Handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:5000/cart-option/${item._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      }).then(res => res.json()).then(data => {
        const updatedCart = cartItm.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1
            };
          }
          return cartItem;
        });
        refetch();
        setcartItm(updatedCart);
      });

      refetch();
    } else {
      alert("Item can't be zero");
    }
  };

  // Calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // Handle delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cart-option/${item._id}`, {
          method: "DELETE"
        }).then(res => res.json()).then(data => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  };

  return (
    <div className='section-container relative'>
      {/* Banner */}
      <div className='bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          {/* Texts */}
          <div className='px-4 space-y-7'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Added To The <span className='text-green-500'>Cart</span>
            </h2>
          </div>
        </div>
      </div>


      
    {/* Order Button */}
    <div className='absolute' style={{ top: '2cm', right: '5.5rem' }}>
  <Link to="/order">
    <button className="btn">
      Order Details
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 ml-2" // Added margin to the left of the icon
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l1 9h11l1-9h2M6 21h12a3 3 0 003-3H3a3 3 0 003 3z" />
      </svg>
    </button>
  </Link>
</div>


      {/* Check if cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center my-12">
          <h3 className="text-xl font-bold">Your cart is empty.</h3>
          <p>Please add products to your cart.</p>
          <Link to="/">
            <button className="btn btn-md bg-green-500 text-white mt-4">Browse Products</button>
          </Link>
        </div>
      ) : (
        <div>
          {/* Table for the cart */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* Head */}
              <thead className='bg-green-500 text-white rounded-sm'>
                <tr>
                  <th>Sr No.</th>
                  <th>Book</th>
                  <th>Book Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row for each cart item */}
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.imageURL} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='font-medium'>{item.bookTitle}</td>
                    <td>
                      <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                      <input type="number" value={item.quantity} onChange={() => console.log(item.quantity)} className='w-10 mx-2 text-center overflow-hidden appearance-none' />
                      <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                    </td>
                    <td>${calculatePrice(item)}</td>
                    <th>
                      <button className="btn btn-ghost text-red-600 btn-xs" onClick={() => handleDelete(item)}>
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer details and shopping details */}
          <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
            <div className='md:w-1/2 space-y-3 pl-[1cm]'>
              <h3 className='font-medium'>Customer Details</h3>
              <p>Name: {user?.displayName || "Demo User"}</p>
              <p>Email: {user?.email}</p>
              <p>User ID: {user?.uid}</p>
            </div>
            <div className='md:w-1/2 space-y-3'>
              <h3 className='font-medium'>Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ${orderTotal.toFixed(2)}</p>
              <Link to='/process-checkout'>
                <button className='btn btn-md bg-green-500 text-white px-8 py-1 mt-5'>Proceed Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
