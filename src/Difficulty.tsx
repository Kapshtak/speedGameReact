import React from 'react'

interface DifficultyProps {
  onChangeInput: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Difficulty: React.FC<DifficultyProps> = ({ onChangeInput, onClick }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 justify-center flex flex-col items-center ease-in duration-300 z-30"
    >
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-lg sm:w-[300px] h-[150px] w-[200px] flex flex-col justify-center items-center">
        <div className="flex">
          <legend>Select the game difficulty:&nbsp;</legend>
          <select className="shadow-inner" name="difficulty" onChange={onChangeInput}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className='flex justify-center'>
          <button onClick={onClick} className="mt-4 bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all text-base text-black font-extralight">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Difficulty
