interface ICircle {
  active: boolean
  difficulty: string
  onClick: () => void
}

const Circle = ({ active, difficulty, onClick }: ICircle) => {
  let style = {}

  const rootClasses =
    'rounded-full bg-cyan-300 mx-2 h-36 w-36 shadow-md shadow-cyan-800 hover:shadow-cyan-600 transition-all mt-3 self-center'.split(
      ' '
    )

  if (active && difficulty !== 'hard') {
    rootClasses.push('bg-cyan-600')
  } else if (active && difficulty === 'hard') {
    rootClasses.push('bg-cyan-600')

    style = { width: '80px', height: '80px' }
  }

  return (
    <div
      style={style}
      className={rootClasses.join(' ')}
      onClick={onClick}
    ></div>
  )
}

export default Circle
