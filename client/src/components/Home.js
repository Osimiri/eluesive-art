import React, { useEffect, useState } from "react";
import { Embed } from 'semantic-ui-react'

function Home() {
  // Code goes here!
const [bookArray, setBookArray] = useState([])

useEffect(() => {
  fetch("/")
  .then(res => res.json())
  .then(data => setBookArray(data))
},
[]);
    return (
        <section>
          {/* <div className = "header">
            <img className ="logo" src = "Better.jpg" alt = "logo" />
        </div> */}
          <h1>Eluesive Art</h1>
          <Embed
    id='d6uN9xYUMxE'
    placeholder='https://steamuserimages-a.akamaihd.net/ugc/1675862552388648329/82113D1A5E258A3A4638B892E4CED1AA1035083D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
    source='youtube'
  />

        </section>

    )
}

export default Home;
