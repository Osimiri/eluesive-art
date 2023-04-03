import React, {useState} from "react";
import { Card, Image, Button, Header, Icon, Label } from "semantic-ui-react";
import Author from "./Author";

function Book({ title, price, likes, genre, author, image, author_image, id, book, books,setBooks }) {
  
  const [bookLikes, setBookLikes] = useState(likes);


  function handleLike(){
    const updatedLikes = likes + 1;
    setBookLikes(updatedLikes);
    console.log(id)
    fetch(`/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const updatedBook = books.map((ogBook) => {
          if (ogBook.id === data.id) {
            return data;
          } else {
            return ogBook;
          }
        });
        setBooks(updatedBook);
        console.log(updatedBook);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function handleDelete(){
    fetch(`/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const updatedBooks = books.filter((book) => book.id !== data.id);
        setBooks(updatedBooks);
        console.log(updatedBooks);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }      
    
  
  const [showFront, setShowFront] = useState(true);

  const toggleCard = () => {
    setShowFront(!showFront);
  };

  return (
  <Card style={{height: "750px", padding: "15px"}} centered raised className="card-container" >
    {showFront ? (
      <>
        <div className = "BookFlic">
          <Image className="card-image" src={image} alt={title} onClick={toggleCard} />
        </div>
        <Card.Content style={{height: "100px", width: 'auto'}}>
          <Card.Header >{title}</Card.Header>
          <Card.Meta>
            <span className="date">Price: ${price}</span>
          </Card.Meta>
          <Card.Description >
            {/* <p>Likes: {likes}</p> */}
            {genre && <p>Genre: {genre}</p>}
            <p>Author: {author}</p>
          </Card.Description>
        </Card.Content>
          <Button.Group attached= 'bottom' size = "medium">
            <Button as="div" labelPosition="right">
              <Button color="brown" onClick={handleLike}>
                <Icon name="heart" />
              </Button>
              <Label as="a" basic pointing="left">
                {likes} Likes!
              </Label>
            </Button>

            {/* <Button 
              className="button"
              attached = 'left' 
              color="brown" 
              onClick={handleLike}
              >
              Like
            </Button> */}
            <Button 
              className="button" 
              attached = 'right'
              color="brown" 
              onClick= {handleDelete}
              >
              Delete
            </Button>
          </Button.Group>
      </>
    ) : (
      <>
        <Image className="author-card-image" onClick={toggleCard} src = {author_image} />
        <Card.Content style={{height: "100px"}}>
          <Card.Header>{author}</Card.Header>
          <Card.Description ></Card.Description>
        </Card.Content>
          <Button.Group attached= 'bottom' size = "medium" >
            <Button as="div" labelPosition="right">
              <Button color="brown" onClick={handleLike}>
                <Icon name="heart" />
              </Button>
              <Label as="a" basic pointing="left">
                {likes} Likes!
              </Label>
            </Button>
            {/* <Button 
              className="button"
              attached = 'left' 
              color="brown" 
              onClick={handleLike}
              >
              Like
            </Button> */}
            <Button 
              className="button" 
              attached = 'right'
              color="brown" 
              onClick= {handleDelete}
              >
              Delete
            </Button>
          </Button.Group>
      </>
  )}
</Card>
);
} 

export default Book;

