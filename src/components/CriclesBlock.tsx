import React, { Fragment } from "react";
import Circle from "./Circle";

type Props = {
  activeCircleNumber: number;
  onClick: (id: number) => void;
};

const CirclesBlock = ({ activeCircleNumber, onClick }: Props) => {
  const circles = [1, 2, 3];
  return (
    <>
      {circles.map((item) => (
        <Fragment key={item}>
          {
            <Circle
              id={item}
              active={item === activeCircleNumber}
              onClick={() => {
                onClick(item);
              }}
            />
          }
        </Fragment>
      ))}
    </>
  );
};

export default CirclesBlock;
