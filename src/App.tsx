import React, { Component } from 'react'
import CirclesBlock from './components/CriclesBlock'
import Difficulty from './components/Difficulty'
import EndGameMessage from './components/EndGameMessage'
import HallOfFame from './components/HallOfFame'
import Header from './components/Header'
import Score from './components/Score'
import TopScore from './components/TopScore'
import championSound from './sounds/champion.wav'
import failSound from './sounds/fail.wav'
import pewSound from './sounds/sound.wav'
import startSound from './sounds/start.wav'

class App extends Component {
  state = {
    counter: 0,
    currentCircle: -1,
    difficulty: 'easy',
    difficultySelectionVisibility: false,
    gameMaxSpeed: 700,
    gameSpeed: 1000,
    gameStatus: false,
    gameStep: 0.98,
    hallOfFameVisibility: false,
    lastCircle: -1,
    modal: false,
    name: '',
    nextCircle: -1,
    newTopScore: false,
    score: 0,
    skippedCircles: 0,
    topScoreLabel: 'topScoreEasy',
    totalCircles: 4
  }

  // sounds
  pewSound = (): void => {
    const sound = new Audio(pewSound)
    sound.play()
  }

  failSound = (): void => {
    const sound = new Audio(failSound)
    sound.volume = 0.4
    sound.play()
  }

  // game difficulty
  setGameDifficulty = (): void => {
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

  gameDifficultyHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setState({ difficulty: event.target.value })
  }

  difficultySelectionVisibility = (): void => {
    this.setState({
      difficultySelectionVisibility: !this.state.difficultySelectionVisibility
    })
  }

  // game management
  getActiveCircle = (): void => {
    let nextCircle = this.state.currentCircle
    while (nextCircle === this.state.currentCircle) {
      nextCircle = Math.floor(Math.random() * this.state.totalCircles) + 1
    }
    this.setState({ currentCircle: nextCircle })
  }

  manageCircles = (): void => {
    this.getActiveCircle()
    this.setState({
      counter: this.state.counter + 1,
      skippedCircles: this.state.counter - this.state.score
    })
  }

  clickHandler = (id: number): void => {
    if (this.state.gameStatus) {
      if (id === this.state.currentCircle) {
        if (id !== this.state.lastCircle) {
          this.pewSound()
          this.setState({ score: this.state.score + 1, lastCircle: id })
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
    setTimeout(this.manageGame, this.state.gameSpeed)
    if (this.state.gameSpeed > this.state.gameMaxSpeed) {
      this.setState({ gameSpeed: this.state.gameSpeed * this.state.gameStep })
      this.manageCircles()
    } else {
      this.manageCircles()
    }
  }

  startGame = (): void => {
    this.setGameDifficulty()
    this.setState({
      counter: 0,
      currentCircle: -1,
      gameSpeed: 1000,
      gameStatus: true,
      lastCircle: -1,
      modal: false,
      name: '',
      nextCircle: -1,
      newTopScore: false,
      score: 0,
      skippedCircles: 0,
    })
    const sound = new Audio(startSound)
    sound.play()
    setTimeout(() => {
      this.manageGame()
    }, 1000)
  }

  gameOver = (): void => {
    this.setState({ gameStatus: false, modal: true, currentCircle: -1 })
    this.checkTopScore()
  }

  // top score
  getLeaderboardFromLocalStorage = (): { name: string; score: number }[] => {
    const topScoreString = localStorage.getItem(this.state.topScoreLabel)
    let topScore: { name: string; score: number }[] = []
    if (topScoreString !== null) {
      topScore = JSON.parse(topScoreString)
    }
    return topScore
  }

  checkTopScore = (): void => {
    const champSound = new Audio(championSound)
    let topScore = this.getLeaderboardFromLocalStorage()
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

  setTopScore = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    let topScore = this.getLeaderboardFromLocalStorage()
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
    this.showHallOfFame()
  }

  heroNameOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ name: event.target.value })
  }

  showHallOfFame = (): void => {
    this.setGameDifficulty()
    this.setState({ hallOfFameVisibility: !this.state.hallOfFameVisibility })
  }

  closeModal = (): void => {
    this.setState({ modal: false })
  }

  render() {
    return (
      <div className="mx-auto w-screen h-screen bg-sky-50 overflow-hidden">
        <EndGameMessage
          modal={this.state.modal}
          closeModal={this.closeModal}
          newTopScore={this.state.newTopScore}
          heroNameOnChangeHandler={this.heroNameOnChangeHandler}
          setTopScore={this.setTopScore}
          score={this.state.score}
          startGame={this.startGame}
        />
        <Header />
        <div className="flex sm:h-[160px] h-[30px] justify-center items-center flex-col font-light text-3xl text-sky-700 mt-4 m-auto">
          {!this.state.hallOfFameVisibility && !this.state.gameStatus && (
            <HallOfFame showHallOfFame={this.showHallOfFame} />
          )}
          {this.state.gameStatus === true && (
            <Score
              score={this.state.score}
              skippedCircles={this.state.skippedCircles}
            />
          )}
          {this.state.hallOfFameVisibility && (
            <TopScore
              onClick={this.showHallOfFame}
              label={this.state.topScoreLabel}
              difficulty={this.state.difficulty}
            />
          )}
        </div>
        <CirclesBlock
          activeCircleNumber={this.state.currentCircle}
          onClick={this.clickHandler}
          totalCircles={this.state.totalCircles}
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
