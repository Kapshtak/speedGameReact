import React from 'react'

interface DifficultyProps {
  onChangeInput: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Difficulty: React.FC<DifficultyProps> = ({ onChangeInput }) => {
  return (
    <div className="animate-bounce">
      <legend>Select the game difficulty</legend>
      <select name="difficulty" onChange={onChangeInput}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  )
}

export default Difficulty
