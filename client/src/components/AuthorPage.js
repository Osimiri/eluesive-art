import React, { useEffect, useState } from "react";
import Author from "./Author"
import {Card} from "semantic-ui-react";

function AuthorPage({authors}){
    const authorCards = authors.map((author) => {

        return (
            
            <Author
                full_name = {author.full_name}
                biography = {author.biography}
                author_image = {author.author_image}
            />
        );
    });

    return (
    <Card.Group itemsPerRow={4}>
      {authorCards}
    </Card.Group>
    )
}

export default AuthorPage;