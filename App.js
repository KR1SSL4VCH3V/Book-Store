import {
    BrowserRouter as Router, Routes, Route
} from "react-router-dom";


import './App.css';
import Header from "./components/Header";
import BooksList from "./pages/BookList";
import BookPage from "./pages/BookPage";
import AddBook from "./pages/AddBook";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateAccount from "./components/UpdateAccount";
import DeleteAccount from "./components/DeleteAccount";
import ToReadList from "./pages/ToReadList";
import AccountSettings from "./components/AccountSettings";

function App() {
    return (
        <Router>
                <div className='container dark'>
                    <div className='app'>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<BooksList/>}/>
                            <Route path="/api/books/to-read/" element={<ToReadList/>}/>

                            <Route path="/api/books/add/" element={<AddBook/>}/>
                            <Route path="/books/:id/" element={<BookPage/>}/>
                            <Route path="/api/signin/" element={<SignIn/>}/>
                            <Route path="/api/signup/" element={<SignUp/>}/>
                            <Route path="/api/:id/settings/" element={<AccountSettings/>}/>
                            <Route path="/api/:id/update/" element={<UpdateAccount/>}/>
                            <Route path="/api/:id/delete/" element={<DeleteAccount/>}/>
                        </Routes>
                    </div>
                </div>
        </Router>

    );
}


export default App;