import { Fragment } from 'react'
import Circle from './Circle'

interface CirclesBlockProps {
  activeCircleNumber: number
  onClick: (id: number) => void
}

const CirclesBlock = ({ activeCircleNumber, onClick }: CirclesBlockProps) => {
  const circles = [1, 2, 3, 4]
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap w-[400px] sm:flex-nowrap sm:w-auto mt-[10px] justify-center">
        {circles.map((item) => (
          <Fragment key={item}>
            <Circle
              id={item}
              active={item === activeCircleNumber}
              onClick={() => {
                onClick(item)
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default CirclesBlock
