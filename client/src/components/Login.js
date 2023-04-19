import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="h-screen w-screen snap-y snap-mandatory overflow-scroll">
      <div className="h-screen w-screen snap-start">
        <div className="min-h-screen bg-[#dad2bc] w-screen pt-20 flex flex-col justify-center snap-start">
          <h1 className="text-6xl font-bold underline mt-20 ml-96">
            Welcome to Eluesive Art
          </h1>
          <h1 className="text-4xl font-light underline mt-20 ml-96">
            How Does It Work?
          </h1>
          <div className="container mr-96 flex flex-row ">
            <div className="list-decimal w-3/5">
              <h3 className=" text-2xl">
                {" "}
                Eluesive Art is designed to be easy to use and intuitive, so you
                can focus on what really matters, creating and sharing your art.
                Here's how it works:{" "}
              </h3>
              <li className=" text-2xl pt-5 ">
                Create an account on our site and set up your profile. This is
                where you can share information about yourself, your art, and
                your creative process.
              </li>
              <li className=" text-2xl pt-2">
                As you work on your project, you can add updates to keep the
                community informed of your progress. This is a great way to stay
                accountable and motivated to finish your work.
              </li>
              <li className=" text-2xl pt-2">
                Eluesive Art is designed to encourage collaboration and
                feedback. You can comment on other artists' updates, offer
                encouragement, and share your thoughts and insights.
              </li>
              <li className=" text-2xl pt-2">
                Share your work: When your project is complete, you can share it
                with the community and get feedback on your finished work.
              </li>
            </div>

            <div>
              <img
                className="flex-1 w-auto"
                src="https://artsy-media-uploads.s3.amazonaws.com/UuRjxo0eNKZTbUf-R0ARbw%2Fcustom-Custom_Size___GettyImages-931866800.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen w-screen flex justify-center items-center bg-[#f5f1ed] snap-start">
        <Wrapper className="bg-[#a99885]" style={{ transform: "scale(1.2)" }}>
          <h1>Eluesive Art</h1>
          {showLogin ? (
            <>
              <LoginForm onLogin={onLogin} />
              <Divider />
              <p>
                Don't have an account? &nbsp;
                {/* <Button
                  className="bg-[#f5f1ed] text-gray-900 px-4 py-2 rounded"
                  color="#f5f1ed"
                  onClick={() => setShowLogin(false)}
                >
                  Sign Up
                </Button> */}
                <button className="bg-[#f5f1ed] text-gray-900 px-4 py-2 rounded" onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignUpForm onLogin={onLogin} />
              <Divider />
              <p>
                Already have an account? &nbsp;
                {/* <Button color="secondary" onClick={() => setShowLogin(true)}>
                  Log In
                </Button> */}
                <button className="bg-[#f5f1ed] text-gray-900 px-4 py-2 rounded" onClick={() => setShowLogin(true)}>
                  Log In
                </button>
              </p>
            </>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

// const Logo = styled.h1`
//   font-family: "Permanent Marker", cursive;
//   font-size: 3rem;
//   color: deeppink;
//   margin: 8px 0 16px;
// `;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
  font-family: "Plus Jakarta Sans", sans-serif;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
  font-family: "Plus Jakarta Sans", sans-serif;
`;

export default Login;
