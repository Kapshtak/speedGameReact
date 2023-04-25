import React, { Fragment } from 'react'
import Circle from './Circle'

type Props = {
  activeCircleNumber: number
  onClick: (id: number) => void
}

const CirclesBlock = ({ activeCircleNumber, onClick }: Props) => {
  const circles = [1, 2, 3, 4]
  return (
    <div className="flex sm:flex-nowrap flex-wrap sm:w-auto w-[375px] sm:justify-center justify-center mt-[10px] -z-10">
      {circles.map((item) => (
        <Fragment key={item}>
          {
            <Circle
              id={item}
              active={item === activeCircleNumber}
              onClick={() => {
                onClick(item)
              }}
            />
          }
        </Fragment>
      ))}
    </div>
  )
}

export default CirclesBlock
