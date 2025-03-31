import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import API_BASE_URL from '../config';

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL} = useLoaderData();


  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-Help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ]
  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  
  const handleChangeSelectedValue = (event) => {
      console.log(event.target.value);
      setSelectedBookCategory(event.target.value);
  }

  // handle book submission
  const handleUpdate = (event) => {
      event.preventDefault();
      const form = event.target;

      const bookTitle = form.bookTitle.value;
      const authorName = form.authorName.value;
      const imageURL = form.imageURL.value;
      const category = form.categoryName.value;
      
      const bookDescription = form.bookDescription.value;
      const bookPDFURL = form.bookPDFURL.value;
      
      const updateBookObj = {
        bookTitle, authorName, imageURL, category, bookDescription, bookPDFURL
      }

      //console.log(bookObj)
      //update book data
      fetch(`${API_BASE_URL}/book/${id}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateBookObj)
      }).then(res => res.json()).then(data => {
        //console.log(data)
        alert("Book is updated successfully!!!")
      })
  } 
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" type="text" name="bookTitle" placeholder="Book Name" defaultValue={bookTitle} required />
          </div>
          {/* authorName */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" type="text" name="authorName" placeholder="Author Name" defaultValue={authorName} required />
          </div>
        </div>

        {/* 2nd row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" type="text" name="imageURL" placeholder="Book image URL" defaultValue={imageURL} required />
          </div>
          {/* category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select id='inputState' name="categoryName" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue} >
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)  
              }     
            </Select>
          </div>
        </div>

        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="book Description" />
          </div>
          <Textarea id="bookDescription" name="bookDescription" placeholder="Write your Book description...." defaultValue={bookDescription} required className="w-full" rows={6} />
        </div>

        {/* book pdf link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput id="bookPDFURL" type="text" name="bookPDFURL" placeholder="Book pdf URL" defaultValue={bookPDFURL} required />
        </div>

        <Button type="submit" className='bg-green-600 text-white mt-5 text-center'>
          Update Book
        </Button>
      </form>    
    </div>
  )
}

export default EditBooks
