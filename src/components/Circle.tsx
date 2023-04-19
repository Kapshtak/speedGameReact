import React from "react";

type Props = {
  id: number;
  onClick: () => void;
  active: boolean;
};

const Circle = ({ id, onClick, active }: Props) => {
  const rootClasses =
    "rounded-full bg-cyan-300 mx-2 h-36 w-36 shadow-md shadow-cyan-800 hover:shadow-cyan-600 transition-all".split(
      " "
    );
  if (active) {
    rootClasses.push("bg-cyan-700");
  }
  return <div className={rootClasses.join(" ")} onClick={onClick}></div>;
};

export default Circle;
