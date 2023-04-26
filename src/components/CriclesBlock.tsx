import { Fragment } from 'react'
import Circle from './Circle'

interface ICirclesBlock {
  activeCircleNumber: number
  difficulty: string
  onClick: (id: number) => void
  totalCircles: number
}

const CirclesBlock = ({ activeCircleNumber, difficulty, onClick, totalCircles }: ICirclesBlock) => {
  const circles = []
  for (let i = 0; i < totalCircles; i++ )
  {
    circles.push(i+1)
  }
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-wrap w-[400px] sm:w-auto mt-[10px] justify-center">
        {circles.map((item) => (
          <Fragment key={item}>
            <Circle
              active={item === activeCircleNumber}
              difficulty={difficulty}
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
