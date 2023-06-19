import React, {useState, useEffect} from "react";
import BookItem from "../components/BookItem";
import {Link} from "react-router-dom";

const ToReadList = () => {
    const [toRead, setToRead] = useState([])

    useEffect(() => {
        getToReadBooks();
    }, [])

    const getToReadBooks = async () => {
        try {
            const response = await fetch("/api/books/to-read/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(toRead)
            })
            if (response.ok) {
                const data = await response.json()
                setToRead(data)
            } else {
                console.log("Failed to fetch the book")
            }
        } catch (error) {
            console.log("Error fetching books")
        }
    }
    return (
        <div className="books-list">
            {toRead.length === 0 ? (
                <div className="empty-list-message">Your list is empty</div>
            ): (
                toRead.map((book, index) => (
                    <BookItem key={index} book={book}/>
                ))
            )}

            <Link to={'/api/books/add/'}>
                <div className='books-add'>&#43;</div>
            </Link>
        </div>

    )

}

export default ToReadList;