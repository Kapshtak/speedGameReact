import React, { Component } from 'react'
import CirclesBlock from './components/CriclesBlock'
import Modal from './components/Modal'
import Difficulty from './Difficulty'
import Hero from './Hero'
import TopScore from './TopScore'
import pewSound from './sounds/sound.wav'
import failSound from './sounds/fail.wav'
import championSound from './sounds/champion.wav'

class App extends Component {
  state = {
    counter: 0,
    score: 0,
    currentCircle: -1,
    lastClickedCircle: -1,
    nextCircle: -1,
    gameStatus: false,
    gamePace: 1000,
    gameStep: 0.98,
    gameMaxSpeed: 700,
    name: '',
    modal: false,
    hallOfFameVisibility: false,
    difficultySelectionVisibility: false,
    difficulty: 'easy',
    topScoreLabel: 'topScoreEasy',
    newTopScore: false
  }

  // sounds
  pewSound = () => {
    const sound = new Audio(pewSound)
    const sound2 = new Audio(pewSound)
    if (sound.duration > 0) {
      sound2.play()
    } else {
      sound.play()
    }
  }

  failSound = () => {
    const sound = new Audio(failSound)
    sound.volume = 0.4
    sound.play()
  }

  // game difficulty
  setGameDifficulty = () => {
    switch (this.state.difficulty) {
      case 'easy':
        this.setState({
          gameMaxSpeed: 750,
          gameStep: 0.98,
          topScoreLabel: 'topScoreEasy'
        })
        break
      case 'medium':
        this.setState({
          gameMaxSpeed: 650,
          gameStep: 0.95,
          topScoreLabel: 'topScoreMedium'
        })
        break
      case 'hard':
        this.setState({
          gameMaxSpeed: 550,
          gameStep: 0.92,
          topScoreLabel: 'topScoreHard'
        })
        break
    }
  }

  gameDifficultyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ difficulty: event.target.value })
  }

  difficultySelectionVisibility = () => {
    this.setState({
      difficultySelectionVisibility: !this.state.difficultySelectionVisibility
    })
  }

  // game management
  getActiveCircle = (): void => {
    let nextCircle = this.state.currentCircle
    while (nextCircle === this.state.currentCircle) {
      nextCircle = Math.floor(Math.random() * 4) + 1
    }
    this.setState({ currentCircle: nextCircle })
  }

  manageCircles = (): void => {
    this.getActiveCircle()
    this.setState({ counter: this.state.counter + 1 })
  }

  clickHandler = (id: number): void => {
    if (this.state.gameStatus) {
      if (id === this.state.currentCircle) {
        if (id !== this.state.lastClickedCircle) {
          this.pewSound()
          this.setState({ score: this.state.score + 1, lastClickedCircle: id })
        }
      } else {
        this.failSound()
        this.gameOver()
      }
    }
  }

  manageGame = (): void => {
    if (!this.state.gameStatus) {
      return
    }
    if (this.state.counter - this.state.score === 3) {
      this.gameOver()
      return
    }
    setTimeout(this.manageGame, this.state.gamePace)
    if (this.state.gamePace > this.state.gameMaxSpeed) {
      this.setState({ gamePace: this.state.gamePace * this.state.gameStep })
      this.manageCircles()
    } else {
      this.manageCircles()
    }
  }

  startGame = (): void => {
    this.setGameDifficulty()
    this.setState({
      counter: 0,
      score: 0,
      currentCircle: -1,
      lastClickedCircle: -1,
      nextCircle: -1,
      gamePace: 1000,
      gameStatus: true,
      name: '',
      modal: false,
      newTopScore: false
    })
    setTimeout(() => {
      this.manageGame()
    }, 1000)
  }

  gameOver = (): void => {
    this.setState({ gameStatus: false, modal: true, currentCircle: -1 })
    this.checkTopScore()
  }

  // top score
  checkTopScore = (): void => {
    const topScoreString = localStorage.getItem(this.state.topScoreLabel)
    const champSound = new Audio(championSound)
    let topScore: { name: string; score: number }[] = []
    if (topScoreString !== null) {
      topScore = JSON.parse(topScoreString)
    }
    if (topScore.length < 5) {
      this.setState({ newTopScore: true })
      champSound.play()
    } else {
      if (topScore[4].score <= this.state.score) {
        champSound.play()
        this.setState({ newTopScore: true })
      }
    }
  }

  heroNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  setTopScore = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const topScoreString = localStorage.getItem(this.state.topScoreLabel)
    let topScore: { name: string; score: number }[] = []
    if (topScoreString !== null) {
      topScore = JSON.parse(topScoreString)
    }
    if (topScore.length < 5) {
      topScore.push({ name: this.state.name, score: this.state.score })
      topScore.sort((a, b) => b.score - a.score)
      localStorage.setItem(
        this.state.topScoreLabel,
        JSON.stringify(topScore.slice(0, 5))
      )
    } else {
      if (topScore[4].score <= this.state.score) {
        topScore.push({ name: this.state.name, score: this.state.score })
        topScore.sort((a, b) => b.score - a.score)
        localStorage.setItem(
          this.state.topScoreLabel,
          JSON.stringify(topScore.slice(0, 5))
        )
      }
    }
    this.setState({
      modal: false
    })
    this.hallOfFame()
  }

  hallOfFame = () => {
    this.setGameDifficulty()
    this.setState({ hallOfFameVisibility: !this.state.hallOfFameVisibility })
  }

  closeModal = (): void => {
    this.setState({ modal: false })
  }

  render() {
    return (
      <div className="mx-auto w-screen h-screen bg-sky-100">
        <Modal visible={this.state.modal} changeVisibility={this.closeModal}>
          {this.state.newTopScore && (
            <Hero
              onChange={this.heroNameOnChange}
              onSubmit={this.setTopScore}
              score={this.state.score}
            ></Hero>
          )}
          {!this.state.newTopScore && (
            <>
              <h2>You have scored {this.state.score} points</h2>
              <button
                className="mt-8 font-light bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all self-center "
                onClick={this.startGame}
              >
                Restart game
              </button>
            </>
          )}
        </Modal>
        <h1 className="text-center pt-[35px] font-light text-sky-700 text-5xl mb-[50px]">
          {`speedGame by `}
          <span className="text-center text-yellow-600 text-5xl underline decoration-wavy underline-offset-[15px] decoration-2 decoration-red-400">
            {`camel_case`}
          </span>
        </h1>

        <div className="flex sm:h-[160px] h-[30px] justify-center items-center flex-col font-light text-3xl text-sky-700 mt-4 m-auto">
          {!this.state.hallOfFameVisibility && !this.state.gameStatus && (
            <div className="flex justify-center">
              <button
                className="sm:mt-8 mt:2 animate-bounce bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all text-base text-black font-extralight"
                onClick={this.hallOfFame}
              >
                Hall of hame!
              </button>
            </div>
          )}
          {this.state.gameStatus === true && <h2>SCORE: {this.state.score}</h2>}
          {this.state.hallOfFameVisibility && (
            <TopScore
              onClick={this.hallOfFame}
              label={this.state.topScoreLabel}
              difficulty={this.state.difficulty}
            />
          )}
        </div>
        <CirclesBlock
          onClick={this.clickHandler}
          activeCircleNumber={this.state.currentCircle}
        />
        <div className="flex flex-col sm:mt-16 mt-8 font-extralight items-center">
          {this.state.difficultySelectionVisibility && (
            <Difficulty
              onChangeInput={this.gameDifficultyHandler}
              onClick={this.difficultySelectionVisibility}
            ></Difficulty>
          )}
          {!this.state.gameStatus && (
            <button
              className="animate-bounce bg-teal-400 w-[270px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all"
              onClick={this.startGame}
            >
              Start the game on {this.state.difficulty} difficulty
            </button>
          )}
          {!this.state.gameStatus && (
            <button
              className="animate-bounce sm:mt-5 mt-3 bg-teal-400 w-[270px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all"
              onClick={this.difficultySelectionVisibility}
            >
              Change the game difficulty
            </button>
          )}
          {this.state.gameStatus && (
            <button
              className="  bg-cyan-700 text-white w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all"
              onClick={this.gameOver}
            >
              Stop game
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default App
