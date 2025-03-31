import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import API_BASE_URL from '../config';

const BestSellerBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
        fetch("${API_BASE_URL}/all-books").then(res => res.json()).then(data => setBooks(data.slice(0,8)))
    }, [])
  return (
    <div>
        <BookCards books={books} headLine="Best Seller Books"/>
    </div>
  )
}

export default BestSellerBooks
