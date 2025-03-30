import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// react icons
import {FaStar} from "react-icons/fa6"
import { Avatar } from "flowbite-react";
import proPic from "../assets/profile.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

        <div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"This platform has transformed my reading habits! The selection of books is fantastic, and I love the easy navigation. Highly recommend!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded 
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Vishal Nagare</h5>    
                    <p className='text-base'>Book Enthusiast</p>               
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'> 
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"An incredible collection of genres and titles! I found exactly what I was looking for and discovered new favorites!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Yash Gaikwad</h5>    
                    <p className='text-base'>Avid Reader</p>               
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'> 
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"I appreciate the user-friendly interface. Finding and purchasing books is a breeze! Plus, their customer service is top-notch!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Aryan Shirodkar</h5>    
                    <p className='text-base'>Frequent Shopper</p>               
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'> 
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"A great platform for both new and experienced readers. I love the recommendations based on my reading history!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Naresh Pillai</h5>    
                    <p className='text-base'>Literature Lover</p>               
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'> 
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"I have found my new favorite book series here! The collection is vast, and the prices are unbeatable. Highly recommend!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Madhura Kamble</h5>    
                    <p className='text-base'>Book Blogger</p>               
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'> 
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-7'>
                    <p>"The community aspect of this platform is amazing! I've connected with other readers and found great recommendations!"</p>
                    <Avatar
                        alt="avatar of jese"
                        img={proPic}
                        rounded
                        className='w-10 mb-4'
                    />
                    <h5 className='text-lg font-medium'>Omkar Sharma</h5>    
                    <p className='text-base'>Community Member</p>               
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
        </div>
    </div>
  )
}

export default Review