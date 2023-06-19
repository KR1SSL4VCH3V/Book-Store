import React, {useState, useEffect} from "react";
import BookItem from '../components/BookItem'
import {Link} from "react-router-dom";


const BooksList = () => {

    const [books, setBooks] = useState([])
    const [toRead, setToRead] = useState([])


    useEffect(() => {
        getBooks()
    }, [])

    const getBooks = async () => {
        try {
            const response = await fetch('/api/books/')
            if (response.ok) {
                const data = await response.json()
                const readBooks = data.filter(book => book.read)
                const toReadBooks = data.filter(book => !book.read)
                setBooks(readBooks)
                setToRead(toReadBooks)

            } else {
                console.log('Failed to fetch books');
            }
        } catch (error) {
            console.log('Error fetching books')
        }
    };


    return (
        <div className='books'>
            <div className='books-header'>
                <Link to={"/"}>
                    <h2 className='books-title'>&#x1F4D7; Read: {books.length}</h2>
                </Link>
                <Link to={"/api/books/to-read"}>
                    <h2 className='books-title'> &#x1F4D6; To Read: {toRead.length}</h2>
                </Link>

            </div>

            <div>
                <div className='books-list'>
                    {books.map((book, index) => (
                        <BookItem key={index} book={book}/>
                    ))}

                    {toRead.map((book, index) => (
                        <BookItem key={index} book={book}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default BooksList;
