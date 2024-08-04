import React from "react";
import { SiDevpost } from "react-icons/si";
import { FaGithub, FaUser } from "react-icons/fa";
import Examples from "../components/Examples";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Nav />
      <section className="pt-[72px] pb-24 px-12 max-w-[1200px] flex flex-col items-center mx-auto">
        <h1 className="max-w-[750px] text-3xl sm:text-5xl font-bold text-center leading-tight">
          Bring <span className="text-accent">color</span> back to your images
          with <span className="text-accent">Chroma</span>
        </h1>
        <p className="mt-4 sm:mt-8 max-w-[750px] text-center font-semibold leading-relaxed sm:text-lg">
          Chroma is a tool designed to adjust the colors of images so that those
          affected by colorblindness can experience heightened color
          differentiation.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center  font-semibold">
          <Link to="/adjust-photos">
            <button className="bg-accent text-light rounded-full w-48 py-2">
              Get Started
            </button>
          </Link>
          <a
            href="#about"
            className="bg-secondary  rounded-full w-48 py-2 text-center"
          >
            About
          </a>
        </div>
        <div className="mt-14 flex justify-center items-center font-medium">
          <div className="flex flex-col items-center">
            <figure className="max-w-[280px]">
              <img src="/before.png" alt="" />
            </figure>
            <p className="mt-2 text-xl">Before</p>
          </div>
          <svg
            width="180"
            height="30"
            viewBox="0 0 256 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-4 sm:mx-8"
          >
            <path
              d="M255.414 16.4142C256.195 15.6332 256.195 14.3668 255.414 13.5858L242.686 0.857864C241.905 0.0768158 240.639 0.0768158 239.858 0.857864C239.077 1.63891 239.077 2.90524 239.858 3.68629L251.172 15L239.858 26.3137C239.077 27.0948 239.077 28.3611 239.858 29.1421C240.639 29.9232 241.905 29.9232 242.686 29.1421L255.414 16.4142ZM0 17H254V13H0V17Z"
              fill="#5A67D8"
            />
          </svg>
          <div className="flex flex-col items-center">
            <figure className="max-w-[280px]">
              <img src="/after.png" alt="" />
            </figure>
            <p className="mt-2 text-xl">After</p>
          </div>
        </div>
      </section>
      <section className="pt-14 pb-24 max-w-[1508px] mx-auto px-4" id="about">
        <h2 className="text-3xl sm:text-5xl font-bold text-center">About</h2>
        <ul className="mt-16 flex flex-wrap gap-10 justify-center">
          <li className="bg-secondary bg-opacity-30 p-8 sm:p-10  rounded-lg">
            <div className="max-w-[380px] w-full min-h-[380px]">
              <p className="text-accent font-bold text-8xl">01.</p>
              <p className="mt-8 text-2xl font-semibold">What is Chroma?</p>
              <p className="mt-6 text-lg leading-[1.75] font-medium">
                Chroma is a website that allows users to modify images so that
                they are more accessible for those with colorblindness.
                Supported modes include Deuteranomaly, Protanomaly, and
                Tritanomaly.
              </p>
            </div>
          </li>
          <li className="bg-secondary bg-opacity-30 p-8 sm:p-10  rounded-lg">
            <div className="max-w-[380px] w-full min-h-[380px]">
              <p className="text-accent font-bold text-8xl">02.</p>
              <p className="mt-8 text-2xl font-semibold">How does it work?</p>
              <p className="mt-6 text-lg leading-[1.75] font-medium">
                Chroma separates images into individual pixels and applies an
                algorithm upon each pixel to enhance visibility for the chosen
                condition.
              </p>
            </div>
          </li>
          <li className="bg-secondary bg-opacity-30 p-8 sm:p-10  rounded-lg">
            <div className="max-w-[380px] w-full min-h-[380px]">
              <p className="text-accent font-bold text-8xl">03.</p>
              <p className="mt-8 text-2xl font-semibold">
                Do I have to pay for Chroma?
              </p>
              <p className="mt-6 text-lg leading-[1.75] font-medium">
                No Way! Chroma does all the magic in your browser. There are no
                fees and never will be. Additionally, your data is private. We
                do not collect any data from our users.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section
        className="py-24 max-w-[1466px] w-full mx-auto px-8 min-h-screen"
        id="examples"
      >
        <h3 className="text-center text-5xl font-bold">Examples</h3>
        <Examples />
      </section>
      <section className="pt-16 pb-32 px-4">
        <div className="max-w-[1100px] w-full mx-auto h-[450px] bg-secondary bg-opacity-35 rounded-[48px] flex flex-col items-center justify-center px-4">
          <p className="max-w-[840px] font-semibold text-2xl sm:text-4xl leading-normal text-center">
            Upload your image, select your mode and see better. Its that easy
            with <span className="text-accent">Chroma</span>.
          </p>
          <Link to="/adjust-photos">
            <button className="mt-8 bg-accent text-light font-semibold py-2.5 w-64 text-lg rounded-xl">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      <footer className="pt-16 pb-20">
        <div className="max-w-[700px] px-4 mx-auto ">
          <p className="text-center font-bold text-3xl text-accent">Chroma</p>
          <ul className="mt-8 flex gap-8 justify-center text-4xl">
            <a
              href="https://devpost.com/colemmorgan?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
              target="_blank"
            >
              <SiDevpost />
            </a>
            <a href="https://github.com/colemmorgan/Chroma" target="_blank">
              <FaGithub />
            </a>
            <span className="cursor-not-allowed">
              <FaUser />
            </span>
          </ul>
          <ul className="mt-8 flex justify-center gap-8 font-semibold">
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#examples">Examples</a>
            <Link to="/adjust-photos"><li>Adjust Photos</li></Link>
          </ul>
          <p className="text-center mt-8 font-medium">
            {" "}
            © Copyright Chroma 2024. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
export default Home;
