import React, { useEffect, useState, useContext } from 'react';
import { Card } from "flowbite-react";
import { AuthContext } from '../contects/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import API_BASE_URL from '../config';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://52.200.115.42:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Add to cart function
  const handleAddtoCart = (book) => {
    if (user && user?.email) {
      const cartItm = { bookId: book._id, bookTitle: book.bookTitle, quantity: 1, imageURL: book.imageURL, price: 10, email: user.email };

      fetch("http://52.200.115.42:5000/cart-option", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItm)
      }).then(res => res.json()).then(datas => {
        if (datas.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book added to cart!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please log in",
        text: "You cannot add products without an account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to sign up"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-up', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are Here</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {books.map(book => (
          <Card key={book._id} className="max-w-sm flex flex-col">
            <img src={book.imageURL} alt={book.bookTitle} className='h-64 w-full object-contain' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white my-2">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-4 flex-grow">
              {book.bookDescription}
            </p>
            <button 
              className='bg-blue-700 font-semibold text-white py-2 rounded'
              onClick={() => handleAddtoCart(book)}
            >
              Buy Now For $10.00
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
