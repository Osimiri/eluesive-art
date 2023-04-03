//liked books, user, 
import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const GridExampleColumnWidth = () => (
  <Grid>
    <Grid.Column width={4}>
      <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
    </Grid.Column>
    <Grid.Column width={9}>
      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Grid.Column>
    <Grid.Column width={3}>
      <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
    </Grid.Column>
  </Grid>
)

export default GridExampleColumnWidth
function Profile({books}) {
    
    
    // const bookCards = books.map((book)=> {
    //     console.log(book)
    //     return (
    //       <Book
    //         title={book.title}
    //         price={book.price}
    //         isbn={book.isbn}
    //         likes={book.likes}
    //         genre_id={book.genre_id}
    //         author={book.author.full_name}
    //         image = {book.image}
    //       />
    //     );
    //   });
}