interface IScore {
  score: number
  skippedCircles: number
}

const Score = ({ score, skippedCircles }: IScore) => {
  return (
    <>
      <h2>SCORE: {score}</h2>
      <h2>LIVES: {2 - skippedCircles}</h2>
    </>
  )
}
export default Score
