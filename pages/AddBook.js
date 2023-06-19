import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddBook = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
        searchBooks()
    };


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie!== "") {
            const cookies = document.cookie.split(";")
            for (let i=0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;

    }

    const searchBooks = async () => {
        try {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                query
            )}`;
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.items || []);
        } catch (error) {
            console.log("Error searching books", error);
        }
    };

    const createBook = async (selectedBook) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const book = searchResults.find((b) => b.id === selectedBook.id);
            const response = await fetch("/api/books/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify(book)
            });

            if (response.ok) {
                navigate("/api/books/to-read/")
                console.log("Successfully created book:", book);

            } else {
                console.log("Unsuccessful created book")
            }
        } catch (error) {
            console.log("Error creating book", error);
        }
    };

    return (
        <div>
            <div className="search-form-field">
                <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={query}
                    onChange={handleQueryChange}
                />
                <button className="ghost-round" onClick={searchBooks}>Search</button>
            </div>

            {searchResults.length > 0 && (
                <div className="books-list">
                    <h4>Search Results:</h4>
                    {searchResults.map((book) => (
                        <div key={book.id}>
                            <h5>{book.volumeInfo.title}</h5>
                            <p>By {book.volumeInfo.author ? book.volumeInfo.author.join(", ") : "Unknown"}</p>
                            {book.volumeInfo.imageLinks && (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                />
                            )}
                            <p>{book.volumeInfo.description}</p>
                            <button onClick={createBook}>Add to Library</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add book form */}

        </div>
    );
};

export default AddBook;
