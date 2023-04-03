// Form file 
import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
// import { Formik, Form } from "formik";


function Submit({handleNewBook, handleNewAuthor, authors, genres, setBooks, books}) {
  const navigate = useNavigate();
  const [genre, setGenreForm] = useState('');
  function handleGenre(e) {
    setGenreForm(e.target.textContent);
  } 
  console.log(genre)

  function handleSubmit(e) {
    e.preventDefault();
  
    const newBook = {
      title: e.target.title.value ,
      genre: genre,
      isbn: e.target.isbn.value ,
      author: e.target.Author.value,
      price: e.target.price.value,
      image: e.target.image.value,
      likes: 0
    };
  
    const newAuthor = {
        full_name: e.target.Author.value,
        biography: e.target.biography.value,
        author_image:  e.target.author_image.value
    };
    
    const authorExists = authors.find(author => author.full_name === newAuthor.full_name)
    
    if (authorExists) {
        authorExists.books.push(newBook);
        handleNewBook(newBook);
  
        fetch("/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook),
          })
          .then((res) => res.json())
          .then(() => {
            setBooks([...books, newBook]);
            alert('Woah you added a book sheeeeeeeeeeeeeeesh')
          });
  
    } else {
        newAuthor.books = [newBook];
        handleNewAuthor(newAuthor);
  
        fetch("/authors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAuthor),
        })
        .then((res) => res.json())
        .then((author) => {
            fetch("/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newBook,
                    author_id: author.id
                }),
              })
                .then((res) => res.json())
                .then(() => {
                  setBooks([...books, newBook]);
                  alert('Woah you added a book sheeeeeeeeeeeeeeesh')
                });
        });
    }
  
    navigate('/books', { forceRefresh: true });
    e.target.reset();
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   // console.log(e.target.title.value)
  //   // console.log(e.target.image.value)
  //   // console.log(e.target.Description.value)
  //   // console.log(e.target.category)
  //   const newBook = {
  //     title: e.target.title.value ,
  //     genre: genre,
  //     isbn: e.target.isbn.value ,
  //     author: e.target.Author.value,
  //     price: e.target.price.value,
  //     image: e.target.image.value,
  //     likes: 0
  //   };

  //   const newAuthor = {
  //       full_name: e.target.Author.value,
  //       biography: e.target.biography.value,
  //       author_image:  e.target.author_image.value
  //   };
    
  //   const authorExists = authors.find(author => author.full_name === newAuthor.full_name)
    
  //   if (authorExists) {
  //       authorExists.books.push(newBook)
  //       handleNewBook(newBook)

  //       fetch("/books", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(newBook),
  //         })
  //           .then((res) => res.json())
  //           .then(() => {
  //             navigate('/books');
  //             alert('Woah you added a book sheeeeeeeeeeeeeeesh')
  //           })
            

  //   } else {
  //       newAuthor.books = [newBook]
  //       handleNewAuthor(newAuthor)
  //       console.log('creating new author')
  //       fetch("/authors", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(newAuthor),
  //       })
  //       .then((res) => res.json())
  //       .then((author) => {
  //           console.log('New Author', author)
  //           fetch("/books", {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                   ...newBook,
  //                   author_id: author.id
  //               }),
  //             })
  //               .then((res) => res.json())         
  //       })
        
  //       navigate('/books');

  //   }

  //   e.target.reset();
  //   // handleNewBook(newBook);

  //   console.log(newBook)
  //   fetch("/books", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newBook),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       navigate('/books');
  //       alert('Woah you added a book sheeeeeeeeeeeeeeesh')
  //     })
  //     // console.log(JSON.stringify(newAuthor))
  //   }
  
  const genreOptions = [
    // {genres}
    { key: "drama", text: "Drama", value: "drama" },
    { key: "fable", text: "Fable", value: "fable" },
    { key: "fiction", text: "Fiction", value: "fiction" },
    { key: "folklore", text: "Folklore", value: "folklore" },
    { key: "historical fiction", text: "Historical Fiction", value: "historical fiction" },
    { key: "horror", text: "Horror", value: "horror" },
    { key: "mystery", text: "Mystery", value: "mystery"},
    { key: "poetry", text: "Poetry", value: "poetry"},
    { key: "science fiction", text: "Science Fiction", value: "science fiction"},
    { key: "non-fiction", text: "Non-Fiction", value: "non-fiction"},
    { key: "biography", text: "Biography", value: "biography"},
    { key: "autobiography", text: "Autobiography", value: "biography"},
    { key: "art", text: "Art", value: "art"},
    { key: "romance", text: "Romance", value: "romance"},
    { key: "travel", text: "Travel", value: "travel"},
    { key: "classics", text: "Classics", value: "classics"},
    { key: "cookbook", text: "Cookbook", value: "cookbook"},
    { key: "fantasy", text: "Fantasy", value: "fantasy"},
  ];

// Vertical Small Setup for Submit Form 
  return (
    <div style={{ backgroundColor: "#5B3E3E", borderRadius: "30px", padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h3>Submit A New Book</h3>
      <Form  onSubmit={handleSubmit}>
        <Form.Field required widths="equal">
          <Form.Input
            required
            size="small"
            label="Book Title"
            placeholder="Book Title"
            name="title"
            style={{ borderRadius: "25px" }}
          />
          <Form.Input
            required
            size="small"
            label="ISBN"
            placeholder="Book ISBN 13"
            name="isbn"
            style={{ borderRadius: "25px"  }}
          />
          <Form.Input
            required
            size="small"
            label="Price"
            placeholder="Price"
            name="price"
            style={{ borderRadius: "25px"  }}
          />
          <Form.Input
            required
            flid
            size="small"
            label="Image"
            placeholder="Image url"
            name="image"
            style={{ borderRadius: "25px"  }}
          />
          <Form.Select
            required
            size="small"
            label="Genre"
            placeholder="figure it out you little idiot"
            name="genre"
            options= {genreOptions}
            onChange={handleGenre}
          />
          <Form.Input
            required
            size="small"
            label="Author"
            placeholder="First Name Last Name"
            name="Author"
            style={{ borderRadius: "25px"  }}
          />
          <Form.Input
            required
            size="small"
            label="Author Photo"
            placeholder="Photo of Author"
            name="author_image"
            style={{ borderRadius: "25px"  }}
          />
          <Form.Input
            required
            size="small"
            label="Biography"
            placeholder="Biography of Author"
            name="biography"
            style={{ borderRadius: "25px"  }}
          />
        </Form.Field>
        <Form.Button color= '#F5DEB3'>
          Submit
        </Form.Button>
      </Form>
    </div>
  ); 
}

export default Submit;