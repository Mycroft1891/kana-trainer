import React, { Component } from 'react';
import { getQuestion, getRandomNumber } from './data/Sign';
import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 1,
      userChoice: 'Hiragana',
      lifes: 5,
      options: ['か', 'き', 'く', 'け'],
      question: 'ki',
      score: 0,
      gameOver: false,
    };
  }

  incrementScore() {
    this.setState(prev => ({ score: prev.score + 1 }));
  }

  removeLife() {
    this.setState(prev => ({ lifes: prev.lifes - 1 }));
  }

  pickNewQuestion() {
    const { userChoice } = this.state;
    const response = getQuestion(userChoice);
    const randomInt = getRandomNumber(4);
    this.setState({
      options: response.options,
      question: response.answers[randomInt],
      answer: randomInt,
      gameOver: false,
    });
  }

  displayGameOver() {
    this.setState({
      score: 0, lifes: 5, question: 'K.O', gameOver: true,
    });
  }

  check(choice) {
    const { options, answer, lifes } = this.state;
    if (choice === options[answer]) {
      this.incrementScore();
    } else {
      this.removeLife();
    }
    this.pickNewQuestion();
    if (lifes === 0) this.displayGameOver();
  }

  changeMode(newChoice) {
    const { userChoice } = this.state;
    if (userChoice === newChoice) return;
    this.setState({ userChoice: newChoice }, () => this.pickNewQuestion());
  }

  render() {
    const {
      score, lifes, question, options, userChoice, gameOver,
    } = this.state;
    return (
      <div className="card">
        <h2>
          Score: {score}
        </h2>
        <h2>
          Lifes: {lifes}
        </h2>
        <h2 className="display">{question}</h2>
        <h3 hidden={gameOver}>
          Translate {userChoice}
        </h3>
        <div className="buttonGroup" hidden={gameOver}>
          {options.map((choice, id) => (
            <button
              key={id}
              onClick={() => this.check(choice)}
              type="button"
            >
              {choice}
            </button>
          ))}
        </div>
        <button
          hidden={!gameOver}
          onClick={() => this.pickNewQuestion()}
          type="button"
        >
          Play Again
        </button>
        <h3>Choose what to learn</h3>
        <button
          type="button"
          className="option"
          onClick={() => this.changeMode('Hiragana')}
        >
          Hiragana
        </button>
        <button
          type="button"
          className="option"
          onClick={() => this.changeMode('Katakana')}
        >
          Katakana
        </button>
      </div>
    );
  }
}

export default Home;
