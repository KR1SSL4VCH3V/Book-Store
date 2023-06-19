import React from 'react'
import {Link} from 'react-router-dom'

const BookItem = ({book}) => {
    return (
        <Link to={`books/${book.id}`}>
            <div className='books-list-item'>
                <h3>Title: {book.title}</h3>
                <p>By: {book.author}</p>
            </div>

        </Link>
    )
}

export default BookItem;

