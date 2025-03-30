import React from 'react';
import { FaBookOpen, FaUsers, FaBullhorn } from 'react-icons/fa';

const About = () => {
  return (
    <div className="mt-28 px-4 lg:px-24 bg-gray-100 py-10 relative overflow-hidden">
      <h2 className="text-5xl font-bold text-center mb-8 text-gray-800">About Us</h2>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our online bookstore! We believe that books are a gateway to new worlds, ideas, and experiences. Our mission is to make reading accessible and enjoyable for everyone. 
      </p>
      <p className="text-lg text-gray-700 mb-4">
        We offer a diverse selection of books across various genres, ensuring that there is something for every reader. Our curated collections highlight both classic and contemporary works, providing you with endless choices for your next read.
      </p>
      <h3 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">Our Mission</h3>
      <p className="text-lg text-gray-700 mb-8">
        Our mission is to foster a love for reading by providing a user-friendly platform that connects readers with their favorite books. We strive to create a community where everyone can share their thoughts and recommendations.
      </p>
      
      <h3 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">Meet the Team</h3><br /><br />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="bg-white shadow-lg p-6 rounded-lg relative">
          <FaBookOpen className="text-6xl text-blue-600 absolute -top-8 left-1/2 transform -translate-x-1/2" />
          <h4 className="text-xl font-bold mt-14">John Doe</h4>
          <p className="text-gray-600">Founder & CEO</p>
          <p className="text-gray-700 mt-2">John is an avid reader with a passion for connecting people with books. He oversees the overall direction of the bookstore.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg relative">
          <FaBullhorn className="text-6xl text-green-600 absolute -top-8 left-1/2 transform -translate-x-1/2" />
          <h4 className="text-xl font-bold mt-14">Jane Smith</h4>
          <p className="text-gray-600">Marketing Manager</p>
          <p className="text-gray-700 mt-2">Jane loves promoting literature and ensuring that readers know about the latest releases and bestsellers.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg relative">
          <FaUsers className="text-6xl text-red-600 absolute -top-8 left-1/2 transform -translate-x-1/2" />
          <h4 className="text-xl font-bold mt-14">Alex Johnson</h4>
          <p className="text-gray-600">Customer Service Lead</p>
          <p className="text-gray-700 mt-2">Alex is here to assist you with any inquiries and ensure you have a seamless shopping experience.</p>
        </div>
      </div>
      
      <div className="absolute -bottom-24 left-0 w-full">
        <svg className="w-full h-24" viewBox="0 0 1440 320">
          <path fill="#d1d5db" fillOpacity="1" d="M0,128L40,106.7C80,85,160,43,240,37.3C320,32,400,64,480,74.7C560,85,640,75,720,80C800,85,880,107,960,106.7C1040,107,1120,85,1200,74.7C1280,64,1360,64,1400,64L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320H0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default About;
