import React, { Component } from "react";
import "./App.css";
import CirclesBlock from "./components/CriclesBlock";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    counter: 0,
    score: 0,
    currentCircle: -1,
    lastClickedCircle: -1,
    nextCircle: -1,
    active: true,
    gameStatus: false,
    gamePace: 1000,
    gameStep: 0.98,
    gameMaxSpeed: 700,
    modal: false,
  };

  clickHandler = (id: number): void => {
    if (this.state.gameStatus) {
      if (id === this.state.currentCircle) {
        if (id !== this.state.lastClickedCircle) {
          this.setState({ score: this.state.score + 1, lastClickedCircle: id });
        }
      } else {
        this.gameOver();
      }
    }
  };

  getActiveCircle = (): void => {
    let nextCircle = this.state.currentCircle;
    while (nextCircle === this.state.currentCircle) {
      nextCircle = Math.floor(Math.random() * 3) + 1;
    }
    this.setState({ currentCircle: nextCircle });
  };

  gameOver = (): void => {
    this.setState({ gameStatus: false, modal: true, currentCircle: -1 });
  };

  manageCircles = (): void => {
    this.getActiveCircle();
    this.setState({ counter: this.state.counter + 1 });
  };

  startGame = (): void => {
    this.manageGame();
    this.setState({gameStatus: true})
  };

  manageGame = (): void => {
    if (!this.state.gameStatus) {
      return;
    }
    if (this.state.counter - this.state.score === 3) {
      //manageLives()
      this.gameOver();
      return;
    }
    setTimeout(this.manageGame, this.state.gamePace);
    if (this.state.gamePace > this.state.gameMaxSpeed) {
      this.setState({ gamePace: this.state.gamePace * this.state.gameStep });
      this.manageCircles();
    } else {
      this.manageCircles();
    }
  };

  render() {
    return (
      <div className="mx-auto w-screen h-screen bg-sky-200 ">
        <Modal visible={this.state.modal} changeVisibility={this.clickHandler}>
          DSDSD
        </Modal>
        <h1 className="text-center pt-[100px] font-light text-sky-700 text-5xl">__speedGame</h1>
        <div className="flex mx-auto w-[400px] justify-between mt-10 font-light text-sky-700 text-3xl">
          <h2>SCORE: {this.state.score}</h2>
          <h2>COUNTER: {this.state.counter}</h2>
        </div>
        <div className="flex justify-center mt-40">
          <CirclesBlock
            onClick={this.clickHandler}
            activeCircleNumber={this.state.currentCircle}
          />
        </div>
        <div className="flex justify-center mt-16 font-extralight">
          {!this.state.gameStatus && (
            <button
              className="bg-teal-400 w-20 h-20 rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all"
              onClick={this.startGame}
            >
              click me
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
