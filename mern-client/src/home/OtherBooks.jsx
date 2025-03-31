import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
import API_BASE_URL from '../config';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect( () => {
        fetch("http://52.200.115.42:5000/all-books").then(res => res.json()).then(data => setBooks(data.slice(0,8)))
    }, [])
  return (
    <div>
        <BookCards books={books} headLine="Other Books"/>
    </div>
  )
}

export default OtherBooks