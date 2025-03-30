import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookCards from '../components/BookCards';

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`http://localhost:5000/all-books?search=${query}`);
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {books.length === 0 ? (
        <div className="bg-red-200 border border-red-500 text-red-800 px-6 py-4 rounded-lg shadow-lg max-w-md text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl">😢</span>
          </div>
          <strong className="font-bold text-xl">No Books Found!</strong>
          <p className="mt-2 text-lg">Book not found or not available.</p>
        </div>
      ) : (
        <div className="w-full">
          <BookCards books={books} />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
