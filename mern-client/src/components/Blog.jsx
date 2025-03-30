import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaPen, FaStar, FaComments } from 'react-icons/fa';

const Blog = () => {
  const dummyPosts = [
    {
      id: 1,
      title: "The Importance of Reading",
      excerpt: "Reading enhances your knowledge and understanding. It opens up new worlds and perspectives...",
      date: "October 1, 2023",
      icon: <FaBookOpen className="text-6xl text-orange-500" />,
    },
    {
      id: 2,
      title: "Top 10 Must-Read Books of 2023",
      excerpt: "Discover the best books released this year, featuring various genres and authors...",
      date: "September 15, 2023",
      icon: <FaStar className="text-6xl text-orange-500" />,
    },
    {
      id: 3,
      title: "How to Choose Your Next Book",
      excerpt: "Struggling to find your next read? Here are some tips on how to select your next book...",
      date: "August 30, 2023",
      icon: <FaPen className="text-6xl text-orange-500" />,
    },
    {
      id: 4,
      title: "Interview with a Local Author",
      excerpt: "We sat down with local author Jane Doe to discuss her latest book and inspirations...",
      date: "August 10, 2023",
      icon: <FaComments className="text-6xl text-orange-500" />,
    },
  ];

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center mb-10 text-gradient">Our Blog</h2>
      <div className="grid gap-8 my-12 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {dummyPosts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-b from-white to-yellow-50">
            <div className="flex justify-center p-4 bg-yellow-100">
              {post.icon}
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2 text-orange-700 hover:text-orange-500 transition">
                <Link to={`/blog/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="inline-block bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
