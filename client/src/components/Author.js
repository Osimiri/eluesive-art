import React, { useEffect, useState } from "react";
import { Grid, Image, Header } from 'semantic-ui-react'


function Author({full_name, biography, author_image}) {
    return (
        <Grid columns = 'equal'>
        <Grid.Column  >
            {/* <Header>{full_name}</Header> */}
            <Image centered bordered size = 'medium' src={author_image} />
            
        </Grid.Column>
        <Grid.Column centered verticalAlign = "middle" style={{ paddingRight: '300px' }}  >
            <Header>{full_name}</Header>
            
            <p>{biography}</p>
        </Grid.Column>
        </Grid>
        // <li>
        // </li>
    );
  }
  
  export default Author;

  
