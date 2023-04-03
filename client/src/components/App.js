import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Author from "../components/Author";
import AuthorPage from "../components/AuthorPage";
import Book from "../components/Book";
import BookPage from "../components/BookPage";
import Header from "../components/Header";
import Home from "../components/Home";
import Profile from "../components/Profile";
import User from "../components/User";
import Submit from "../components/Submit";



function App() {
  
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([]);

  console.log(genres)
  // console.log(users)

  useEffect(() => {
    fetch("/books")       // link for the books DB
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    fetch("/authors")       // link for the authors DB
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);
  
  useEffect(() => {
    fetch("/users")       // link for the authors DB
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  
  useEffect(() => {
    fetch("/genres")       // link for the authors DB
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);
  
  // const usersLikedBooks = users.liked_books?.map((book) => book)
  // console.log(usersLikedBooks);
  function handleNewBook(newBook) {
    setBooks([...books, newBook]);
    // console.log(newPost);
  }

  function handleNewAuthor(newAuthor) {
    setAuthors([...authors, newAuthor]);
  }

    
  return(
      <div className="App">
      <Header />
        {/* <h1>Welcome to Better Reads</h1> */}

        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/books" element={<BookPage genre = {genres} books = {books} setBooks = {setBooks} />} /> 
          <Route path="/authors" element={<AuthorPage authors = {authors}/>} /> 
          {/* <Route path="/profile" element={<Profile users = {users} />} /> */}
          <Route path="/submit" element={<Submit handleNewBook = {handleNewBook} handleNewAuthor ={handleNewAuthor} authors = {authors} genres = {genres} setBooks = {setBooks} books = {books}/>} />

        </Routes>


      </div>
  )
}



export default App;

// dont think that we need a component for userbooks, since theyll be rendered after sorting 
// dont think we need genre compnonent since genres link to backend will just be used for sorting i think
// whats difference intended for BookPage vs Render Book component
// I think book is for how each individual book will render on a card 
// but book page is the container they would all live in 

//I wasnt sure, i thought they would be the same thing 
//we can delete 
//so kinda like how pokemon searcher was like?
//yuh
//but we can go ahead and delete genre and userbooks