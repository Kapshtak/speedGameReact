interface ICircle {
  active: boolean
  difficulty: string
  onClick: () => void
}

const Circle = ({ active, difficulty, onClick }: ICircle) => {
  const rootClasses =
    'rounded-full bg-cyan-300 mx-2 h-36 w-36 shadow-md shadow-cyan-800 hover:shadow-cyan-600 transition-all mt-3 self-center'.split(
      ' '
    )
  if (active && difficulty !== 'hard') {
    rootClasses.push('bg-cyan-600')
  } else if (active && difficulty === 'hard') {
    rootClasses.push('bg-cyan-600 w-20 h-20')
  }
  return <div   className={rootClasses.join(' ')} onClick={onClick}></div>
}

export default Circle
