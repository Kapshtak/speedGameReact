import React from 'react'
import Modal from '../UI/Modal'
import Hero from './Hero'

interface IEndGameMessage {
  modal: boolean
  closeModal: () => void
  newTopScore: boolean
  heroNameOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  setTopScore: (event: React.FormEvent<HTMLFormElement>) => void
  score: number
  startGame: () => void
}

const EndGameMessage = ({
  modal,
  closeModal,
  newTopScore,
  heroNameOnChangeHandler,
  setTopScore,
  score,
  startGame
}: IEndGameMessage) => {
  const messagesArray = {
    1: 'To survive, you should click faster!',
    2: 'You are the great circle slayer!',
    3: 'What are you? Could you really be stopped?'
  }
  let finalMessage
  if (score < 10) {
    finalMessage = messagesArray[1]
  } else if (score < 20) {
    finalMessage = messagesArray[2]
  } else {
    finalMessage = messagesArray[3]
  }
  
  return (
    <Modal visible={modal} changeVisibility={closeModal}>
      {newTopScore && (
        <Hero
          onChange={heroNameOnChangeHandler}
          onSubmit={setTopScore}
          score={score}
        ></Hero>
      )}
      {!newTopScore && (
        <>
          <h2 className='text-center'>You have scored {score} points</h2>
          <h2 className='text-center'>{finalMessage}</h2>
          <button
            className="mt-8 font-light bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all self-center "
            onClick={startGame}
          >
            Restart game
          </button>
        </>
      )}
    </Modal>
  )
}

export default EndGameMessage
