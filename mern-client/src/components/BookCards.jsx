import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import API_BASE_URL from '../config';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaCartShopping } from 'react-icons/fa6'
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import Swal from 'sweetalert2';

const BookCards = ({headLine, books}) => {
    //console.log(books);

//const {_id,bookTitle,imageURL,price} = books;

const {user} = useContext(AuthContext);
//console.log(user)

const navigate = useNavigate();
const location = useLocation();


//add to cart button
const handleAddtoCart = (book) =>{
  //console.log("button is clicked",book)
  if(user && user?.email){
    const cartItm = {bookId: book._id, bookTitle: book.bookTitle, quantity: 1, imageURL: book.imageURL, price: 10, email: user.email};
    //console.log(cartItm)
    fetch("${API_BASE_URL}/cart-option", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(cartItm)
    }).then(res => res.json()).then(datas => {
      //console.log(datas);
      if(datas.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  } else{
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
        navigate('/sign-up', {state:{from: location}})
      }
    });
  }
}

  return (
    <div className='my-16 px-4 lg:px-24 '>
        <h2 className='text-5xl text-center font-bold text-black my-5'>{headLine}</h2>

        {/* cards */}
        <div className='mt-12'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
        {
            books.map(book => <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`}>
                    <div className='relative'>
                        <img src={book.imageURL} alt="" />
                        <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                            <FaCartShopping className='w-4 h-4 text-white' onClick = {() => handleAddtoCart(book)}/>
                        </div>
                    </div>
                    <div>
                        <h3>{book.bookTitle}</h3>
                        <p>{book.authorName}</p>
                    </div>
                    <div>
                        <p>$10.00</p>
                    </div>
                </Link>
            </SwiperSlide>)
        }
      </Swiper>
        </div>
    </div>
  )
}

export default BookCards
