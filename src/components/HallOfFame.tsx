interface IHallOfFame {
  showHallOfFame: () => void
}

const HallOfFame = ({ showHallOfFame }: IHallOfFame) => {
  return (
    <div className="flex justify-center">
      <button
        className="sm:mt-8 mt:2 animate-bounce bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all text-base text-black font-extralight"
        onClick={showHallOfFame}
      >
        Hall of fame!
      </button>
    </div>
  )
}

export default HallOfFame
