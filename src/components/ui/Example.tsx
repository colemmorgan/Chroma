import React from "react";

type ExampleProps = {
  index: number,
  images: string[],
  name: string
};

const Example: React.FC<ExampleProps> = ({index, name, images}) => {
  return (
    <div className="">
      <p className="text-2xl font-semibold text-center md:text-left">
        <span className="text-accent">{index + 1}.</span> User with {name}
      </p>
      <div className="flex justify-center md:justify-start flex-wrap items-center mt-6">
        <Item url={images[0]} desc={"Original"}/>
        <Arrow />
        <Item url={images[1]} desc={`Original with ${name}`}/>
        <Arrow />
        <Item url={images[2]} desc={"Enhanced"}/>
        <Arrow />
        <Item url={images[3]} desc={`Enhanced with ${name}`}/>
      </div>
    </div>
  );
};
export default Example;

type ItemProps = {
    url: string,
    desc: string
}

const Item: React.FC<ItemProps> = ({url, desc}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="max-w-[230px] overflow-hidden">
        <img src={url} alt="" className="w-full"/>
      </div>
      <p className="mt-3 text-center font-medium text-lg mx-auto">{desc}</p>
    </div>
  );
};

const Arrow = () => {
  return (
    <svg
      width="91"
      height="16"
      viewBox="0 0 91 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8 mx-4 w-0 xl:w-[90px]"
    >
      <path
        d="M90.7071 8.70711C91.0976 8.31658 91.0976 7.68342 90.7071 7.29289L84.3431 0.928932C83.9526 0.538408 83.3195 0.538408 82.9289 0.928932C82.5384 1.31946 82.5384 1.95262 82.9289 2.34315L88.5858 8L82.9289 13.6569C82.5384 14.0474 82.5384 14.6805 82.9289 15.0711C83.3195 15.4616 83.9526 15.4616 84.3431 15.0711L90.7071 8.70711ZM0 9H90V7H0V9Z"
        fill="#5A67D8"
      />
    </svg>
  );
};
