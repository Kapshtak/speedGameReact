import { Fragment } from 'react'
import Circle from './Circle'

interface ICirclesBlock {
  activeCircleNumber: number
  onClick: (id: number) => void
}

const CirclesBlock = ({ activeCircleNumber, onClick }: ICirclesBlock) => {
  const circles = [1, 2, 3, 4]
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap w-[400px] sm:flex-nowrap sm:w-auto mt-[10px] justify-center">
        {circles.map((item) => (
          <Fragment key={item}>
            <Circle
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
