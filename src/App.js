import React from 'react';
import Particles from 'react-particles-js';
import AnswerSection from './components/AnswerSection/AnswerSection.component.jsx';
import Settings from './components/SettingsSection/Settings.component';

import particlesOptions from './particles.json';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      synth: window.speechSynthesis,
      currentNumber: 100,
      score: 0,
      minimum: 0,
      maximum: 1000,
      speed: 1.0,
      autoplay: true,
      gameType: "integer"
    }
  }

  componentDidMount = () => {
    this.generateNumber();

    let score = localStorage.getItem("score") ?? 0;
    let minimum = localStorage.getItem("minimum") ?? 0;
    let maximum = localStorage.getItem("maximum") ?? 1000;
    let speed = localStorage.getItem("speed") ?? 1;
    let autoplay = localStorage.getItem("autoplay") ?? true;

    this.setState({
      score: parseInt(score),
      minimum: parseFloat(minimum),
      maximum: parseFloat(maximum),
      speed: parseFloat(speed),
      autoplay
    });
  }

  generateNumber = () => {
    let {minimum, maximum} = this.state;
    
    minimum = Math.floor(parseFloat(minimum));
    maximum = Math.ceil(parseFloat(maximum));

    let finalNumber = Math.floor(Math.random() * ((maximum + 1) - minimum) + minimum);

    this.setState({currentNumber: finalNumber}, () => {
      if(this.state.autoplay) this.utterNumber();
    })
  }

  utterNumber = () => {

  }

  handleSettingsChange = (e) => {
    const { value, name } = e.target;
    
    this.setState({ [name]: value });
    this.saveData(name, value);
  }

  handleValidAnswer = () => {
    let currentScore = this.state.score;
    this.setState({score: currentScore + 1});
    this.saveData("score", currentScore + 1);
    this.generateNumber();
  }

  saveData = (name, value) => {
    localStorage.setItem(name, value);
  }

  resetStorage = () => {
    this.saveData("minimum", 0);
    this.saveData("maximum", 1000);
    this.saveData("speed", 1);
    this.saveData("autoplay", true);
    this.saveData("score", 0);
  }

  reset = () => {
    this.setState({
      minimum: 0,
      maximum: 1000,
      speed: 1,
      autoplay: true,
      score: 0
    })

    this.resetStorage();
  }

  getSettingsObject = () => {
    return {
      minimum: localStorage.getItem("minimum") ?? 0,
      maximum: localStorage.getItem("maximum") ?? 1000,
      speed: localStorage.getItem("speed") ?? 1,
      autoplay: localStorage.getItem("autoplay") ?? "true"
    }
  }

  render = () => {
    return (
      <div className="App">
        <Particles options={particlesOptions}/>
        
        <h1 className="title jpText">漢字トレーナー</h1>

        <div className="playArea">
          <h2 className="jpText">{this.state.score}点</h2>
          <AnswerSection 
            speak={() => this.utterNumber()} 
            validate={(input) => this.validateNumber(input)}
            currentNumber={this.state.currentNumber}
            onValidAnswer={this.handleValidAnswer} />
        </div>
      </div>
    );
  }
}