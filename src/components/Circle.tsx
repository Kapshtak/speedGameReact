interface CircleProps {
  id: number
  onClick: () => void
  active: boolean
}

const Circle = ({ id, onClick, active }: CircleProps) => {
  const rootClasses =
    'rounded-full bg-cyan-300 mx-2 h-36 w-36 shadow-md shadow-cyan-800 hover:shadow-cyan-600 transition-all mt-3'.split(
      ' '
    )
  if (active) {
    rootClasses.push('bg-cyan-600')
  }
  return <div className={rootClasses.join(' ')} onClick={onClick}></div>
}

export default Circle
