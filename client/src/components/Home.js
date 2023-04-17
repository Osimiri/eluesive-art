import React from "react";
import { Embed } from 'semantic-ui-react'

function Home() {
  // Code goes here!

    return (
        <section class="bg-[#f5f1ed]">

        <div class="min-h-screen bg-[#f5f1ed] w-screen pt-20 flex flex-col justify-center">
          
          <h1 class="text-8xl font-bold mt-40 ml-96">Eluesive Art</h1>
          <div class = "container mr-96 flex flex-row ">

            <div class= " w-3/5">
              <p class=" text-3xl mt-40 text-right ">Don't let you art elude you...</p>
            </div>
  
          </div>
        </div>

        <div class="min-h-screen bg-[#a1a485] w-screen pt-20 flex flex-col justify-center">
  
          <h1 class="text-6xl font-bold underline mt-40 ml-96">What is it?</h1>
          <div class = "container mr-96 flex flex-row ">

            <div class= " w-3/5">
              <p class="text-left text-3xl pr-10 mt-40 ">Eluesive Art is a platform designed to help artists stay productive, motivated, and engaged with their creative process. Whether you're looking for feedback, support, or inspiration, our community is here to help you achieve your artistic goals.</p>
            </div>

            <div>
              <img class="flex-1 w-auto" src="https://i.pinimg.com/originals/3a/80/36/3a80363ad681b4f6a79276c85f81ccb0.jpg"></img>
            </div>
          </div>
        </div>

        <div class="min-h-screen bg-[#4a5240] w-screen pt-20 flex flex-col justify-center">
  
          <h1 class="text-6xl font-bold underline mt-40 ml-96 text-[#f5f1ed]">What is it?</h1>
          <div class = "container mr-96 flex flex-row ">
          
            <div class= " w-3/5">          
              <p class="text-left text-2xl pt-6 pr-10 text-[#f5f1ed]" >Welcome to our creative community! We are a website designed for artists who want to stay motivated and productive.
                  We believe that procrastination can be a major obstacle to achieving your goals as an artist, and that's why we offer a space where you can showcase your work,
                  get feedback from fellow artists, and stay accountable to your creative projects. </p>
              <p class="text-left text-2xl pt-6 pr-10 text-[#f5f1ed]">Our platform provides you with the tools you need to track your progress, share updates on your projects, and receive support from like-minded individuals.
                  We encourage you to use this space as a place of inspiration, collaboration, and celebration of your artistic endeavors.</p>
              <p class="text-left text-2xl pt-6 pr-10 text-[#f5f1ed]">So, whether you're a painter, sculptor, musician, writer, or any other type of artist, we invite you to join our community and start sharing your work today.
                  Let's create something beautiful together!</p>
            </div>

            <div>
              <img class="flex-1 w-auto" src="https://i.pinimg.com/originals/3a/80/36/3a80363ad681b4f6a79276c85f81ccb0.jpg"></img>
            </div>
          </div>
        </div>


        <div class="min-h-screen bg-[#f5f1ed] w-screen pt-20 flex flex-col justify-center">
          <h1 class="text-6xl font-bold underline mt-20 ml-96">How Does It Work?</h1>

              <div class = "container mr-96 flex flex-row " >
                <div class="list-decimal w-3/5">
                  <h3 class= " text-2xl" > Eluesive Art is designed to be easy to use and intuitive, so you can focus on what really matters, creating and sharing your art. Here's how it works: </h3>
                  <li class= " text-2xl" >Create an account on our site and set up your profile. This is where you can share information about yourself, your art, and your creative process.</li>
                  <li class= " text-2xl" >As you work on your project, you can add updates to keep the community informed of your progress. This is a great way to stay accountable and motivated to finish your work.</li>
                  <li class= " text-2xl" >Eluesive Art is designed to encourage collaboration and feedback. You can comment on other artists' updates, offer encouragement, and share your thoughts and insights.</li>
                  <li class= " text-2xl" >Share your work: When your project is complete, you can share it with the community and get feedback on your finished work.</li>
                </div>
                
                <div>
                  <img class="flex-1 w-auto" src="https://i.pinimg.com/originals/3a/80/36/3a80363ad681b4f6a79276c85f81ccb0.jpg"/>
                </div>  
              </div>

        </div>

        <div>
          <Embed
            id='d6uN9xYUMxE'
            placeholder='https://steamuserimages-a.akamaihd.net/ugc/1675862552388648329/82113D1A5E258A3A4638B892E4CED1AA1035083D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
            source='youtube'
          />
        </div>
        </section>

    )
}

export default Home;
