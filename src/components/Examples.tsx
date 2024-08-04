import React from "react";
import Example from "./ui/Example";

type ExamplesProps = {};

const Examples: React.FC<ExamplesProps> = () => {
  const examples = [
    {
      name: "Protanomaly",
      src: [
        "/protanomaly-example/original.PNG",
        "/protanomaly-example/original-blind.png",
        "/protanomaly-example/enhanced.png",
        "/protanomaly-example/enhanced-blind.png",
      ],
    },
    {
      name: "Deuteranomaly",
      src: [
        "/deuteranomaly-example/original.png",
        "/deuteranomaly-example/original-blind.jpg",
        "/deuteranomaly-example/enhanced.png",
        "/deuteranomaly-example/enhanced-blind.jpg",
      ],
    },
    {
      name: "Tritanomaly",
      src: [
        "/tritanomaly-example/original.png",
        "/tritanomaly-example/original-blind.jpg",
        "/tritanomaly-example/enhanced.png",
        "/tritanomaly-example/enhanced-blind.jpg",
      ],
    },
  ];
  return (
    <ul className="flex flex-col gap-16 mt-16  w-full">
      {examples.map((example, index) => (
        <Example index={index} name={example.name} images={example.src} key={example.name}/>
      ))}
    </ul>
  );
};
export default Examples;
