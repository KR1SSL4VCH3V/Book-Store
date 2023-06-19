import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom";

const BookPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null)
    const [rating, setRating] = useState('')


    useEffect(() => {
        getBook()
    }, [id]);

    const getBook = async () => {
        try {
            const response = await fetch(`/api/books/${id}/`)
            const data = await response.json()
            setBook(data)
        } catch (error) {
            console.log('Error fetching book', error)
        }
    };

    const handleInputChange = (event) => {
        const {name, value, type, checked} = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        setBook({...book, [name]: inputValue});
    };


    const updateBook = async () => {
        try {
            const response = await fetch(`/api/books/${id}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book),
            })

            if (response.ok) {
                console.log('Book updated');
                navigate("/")
            } else {
                console.log('Error updating book')
            }

        } catch (error) {
            console.log('Error updating book', error)
        }
    };

    const deleteBook = async () => {
        try {
            const response = await fetch(`/api/books/${id}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Successfully deleted')
                navigate('/');
            } else {
                console.log('Error deleting the book')
            }

        } catch (error) {
            console.log('Error deleting the book', error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateBook();
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const starValue = i.toString();
            const filledStars = rating >= i ? '★' : '☆';
            stars.push(
                <span
                    key={i}
                    onClick={() => setRating(starValue)}
                    style={{cursor: "pointer"}}
                >
                    {filledStars}
                </span>
            );
        }
        return stars
    }

    return (
        <div className='books-list'>
              <div className="books-title">
                <Link to="/">&#8592;</Link>
            </div>

            <div className='form-field'>
                {book && (
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={book.title || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br/>
                        <div className="form-field">
                            By:
                            <input
                                type="text"
                                name="author"
                                value={book.author || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br/>

                        <p>Rate this book:</p>
                        <div className="stars">
                            {renderStars()}


                        </div>

                        <div className='form-field'>
                            <input
                                type="checkbox"
                                name="read"
                                checked={book.read || false}
                                onChange={handleInputChange}
                            />
                        </div>


                        <button className="ghost-round" onClick={updateBook}>Update</button>
                        <button className="ghost-round-delete" onClick={deleteBook}>Delete</button>
                    </form>
                )}
            </div>
        </div>
    )

}

export default BookPage;
