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
        <div>
          <h1>Eluesive Art</h1>
          <h1>Eluesive Art</h1>
          <h1>Eluesive Art</h1>
          <h1>What is it?</h1>
          <p>Eluesive Art is a platform designed to help artists stay productive, motivated, and engaged with their creative process. Whether you're looking for feedback, support, or inspiration, our community is here to help you achieve your artistic goals.</p>
          
          <p>Welcome to our creative community! We are a website designed for artists who want to stay motivated and productive. 
              We believe that procrastination can be a major obstacle to achieving your goals as an artist, and that's why we offer a space where you can showcase your work,
              get feedback from fellow artists, and stay accountable to your creative projects. </p>

          <p>Our platform provides you with the tools you need to track your progress, share updates on your projects, and receive support from like-minded individuals.
              We encourage you to use this space as a place of inspiration, collaboration, and celebration of your artistic endeavors.</p>

          <p>So, whether you're a painter, sculptor, musician, writer, or any other type of artist, we invite you to join our community and start sharing your work today. 
              Let's create something beautiful together!</p>
        </div>

        <div>
          <h1>How Does It Work?</h1>
          <h3> Eluesive Art is designed to be easy to use and intuitive, so you can focus on what really matters - creating and sharing your art. Here's how it works: </h3>
          <li>Create an account on our site and set up your profile. This is where you can share information about yourself, your art, and your creative process.</li>
          <li>Once you're signed in, you can create a new project and give it a title, description, and tags. This is where you can keep track of your progress, share updates on your work, and receive feedback from the community.</li>
          <li>As you work on your project, you can add updates to keep the community informed of your progress. This is a great way to stay accountable and motivated to finish your work.</li>
          <li>Eluesive Art is designed to encourage collaboration and feedback. You can comment on other artists' updates, offer encouragement, and share your thoughts and insights.</li>
          <li>Share your work: When your project is complete, you can share it with the community and get feedback on your finished work.</li>
        </div>

          <Embed
    id='d6uN9xYUMxE'
    placeholder='https://steamuserimages-a.akamaihd.net/ugc/1675862552388648329/82113D1A5E258A3A4638B892E4CED1AA1035083D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
    source='youtube'
  />

        </section>

    )
}

export default Home;
