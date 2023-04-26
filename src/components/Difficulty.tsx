import React from 'react'

interface IDifficulty {
  onChangeInput: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Difficulty = ({ onChangeInput, onClick }: IDifficulty) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 justify-center flex flex-col items-center ease-in duration-300 z-30">
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-lg sm:w-[350px] h-[150px] w-[300px] flex flex-col justify-center items-center">
        <div className="flex">
          <legend>Select the game difficulty:&nbsp;</legend>
          <select
            className="bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            name="difficulty"
            onChange={onChangeInput}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClick}
            className="mt-4 bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all text-base text-black font-extralight"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Difficulty
