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
          <h2>You have scored {score} points</h2>
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
