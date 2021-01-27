import React from 'react';
import Particles from 'react-particles-js';
import AnswerSection from './components/AnswerSection/AnswerSection.component.jsx';
import Modal from './components/Modal/Modal.component.jsx';

import particlesOptions from './particles.json';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    }
  }

  componentDidMount = () => {
    let score = localStorage.getItem("score") ?? 0;

    this.setState({
      score: parseInt(score)
    });
  }

  handleValidAnswer = () => {
    let currentScore = this.state.score;
    this.setState({score: currentScore + 1});
    this.saveData("score", currentScore + 1);
  }

  saveData = (name, value) => {
    localStorage.setItem(name, value);
  }

  openModal = () => {
    document.querySelector(".modal").classList.add("showModal");
  }

  render = () => {
    return (
      <div className="App">
        <Particles options={particlesOptions}/>
        
        <h1 className="title jpText" onClick={this.openModal}>漢字トレーナー</h1>

        <div className="playArea">
          <h2 className="jpText">{this.state.score}点</h2>
          <AnswerSection onValidAnswer={this.handleValidAnswer} />
          <Modal />
        </div>
      </div>
    );
  }
}