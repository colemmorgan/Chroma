import React from "react";

type ExampleProps = {};

const Example: React.FC<ExampleProps> = () => {
  return (
    <div className="">
      <p className="text-2xl font-semibold">
        <span className="text-accent">1.</span> User with Protanomaly
      </p>
      <div className="flex flex-wrap items-center">
        <Item url="\protanomaly-example\original.PNG"/>
        <Arrow />
        <Item url="\protanomaly-example\original-blind.png"/>
        <Arrow />
        <Item url="\protanomaly-example\enhanced.png"/>
        <Arrow />
        <Item url="\protanomaly-example\enhanced-blind.png"/>
      </div>
    </div>
  );
};
export default Example;

type ItemProps = {
    url: string
}

const Item: React.FC<ItemProps> = ({url}) => {
  return (
    <div className="max-w-[272px]">
      <figure className="">
        <img src={url} alt="" />
      </figure>
      <p className="-mt-4 text-center font-medium text-lg">Original</p>
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
    >
      <path
        d="M90.7071 8.70711C91.0976 8.31658 91.0976 7.68342 90.7071 7.29289L84.3431 0.928932C83.9526 0.538408 83.3195 0.538408 82.9289 0.928932C82.5384 1.31946 82.5384 1.95262 82.9289 2.34315L88.5858 8L82.9289 13.6569C82.5384 14.0474 82.5384 14.6805 82.9289 15.0711C83.3195 15.4616 83.9526 15.4616 84.3431 15.0711L90.7071 8.70711ZM0 9H90V7H0V9Z"
        fill="#5A67D8"
      />
    </svg>
  );
};
