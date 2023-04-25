import React from 'react'

interface TopScoreProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  label: string,
  difficulty: string
}

const TopScore: React.FC<TopScoreProps> = ({ onClick, label, difficulty }) => {
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }
  const topScoreString = localStorage.getItem(label)
  let topScore: { name: string; score: number }[] = []
  if (topScoreString !== null) {
    topScore = JSON.parse(topScoreString)
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 justify-center flex flex-col items-center ease-in duration-300 z-30"
      onClick={onClick}
    >
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-lg sm:w-[500px] h-[460px] w-[300px] justify-center flex flex-col items-center">
        <table className="border-separate border-spacing-2 z-10 ">
          <caption className="caption-top m-4 font-normal text-5xl">
            Hall of Fame:
            <p className='text-base mt-3'>{difficulty} difficulty</p>
          </caption>
          <thead>
            <tr>
              <th className="shadow-inner w-[90px] h-[50px] text-center font-light text-2xl">
                Rank
              </th>
              <th className="shadow-inner w-[250px] h-[50px] text-center font-light text-2xl">
                Name
              </th>
              <th className=" shadow-inner w-[110px] h-[50px] text-center font-light text-2xl">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {topScore.slice(0, 5).map((player, index) => {
              let style
              switch (index) {
                case 0:
                  style = 'text-amber-300'
                  break
                case 1:
                  style = 'text-slate-400'
                  break
                case 2:
                  style = 'text-orange-500'
                  break
                default:
                  style = ''
              }
              return (
                <tr key={player.name}>
                  <td
                    className={`shadow-inner h-[50px] text-center font-light text-xl ${style}`}
                  >
                    {getOrdinal(index + 1)}
                  </td>
                  <td
                    className={`shadow-inner h-[50px] text-center font-light text-xl ${style}`}
                  >
                    {player.name}
                  </td>
                  <td
                    className={`shadow-inner h-[50px]  text-center font-light text-xl ${style}`}
                  >
                    {player.score}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopScore
