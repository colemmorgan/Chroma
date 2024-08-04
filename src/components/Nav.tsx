import React from "react";
import { Link } from "react-router-dom";

type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  return (
    <nav className="w-full">
      <div className="max-w-[1100px] mx-auto px-4 h-20 flex justify-between items-center">
        <p className="text-lg sm:text-xl font-bold text-accent">Chroma</p>
        <ul className="flex gap-4 sm:gap-6 font-semibold  text-xs sm:text-sm">
          <a href="#about">About</a>
          <a href="#examples">Examples</a>
          <Link to={"/adjust-photos"}><li className="cursor-pointer">Adjust Photos</li></Link>
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
