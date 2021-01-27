import React from 'react';
import Particles from 'react-particles-js';
import AnswerSection from './components/AnswerSection/AnswerSection.component.jsx';

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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8765');
    xhr.send(JSON.stringify({'action': 'createDeck', 'version': 6, 'params': {deck: 'test1'}}));

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

  render = () => {
    return (
      <div className="App">
        <Particles options={particlesOptions}/>
        
        <h1 className="title jpText">漢字トレーナー</h1>

        <div className="playArea">
          <h2 className="jpText">{this.state.score}点</h2>
          <AnswerSection     
            onValidAnswer={this.handleValidAnswer} />
        </div>
      </div>
    );
  }
}