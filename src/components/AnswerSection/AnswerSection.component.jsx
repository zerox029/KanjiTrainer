import React from 'react'
import {ReactComponent as PlayBtn} from '../../assets/play-solid.svg';

import './AnswerSection.styles.css';

export default class AnswerSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGuess: ""
    }
  }

  handleChange = (e) => {
    this.setState({currentGuess: e.target.value});
    this.validateNumber(e.target.value);
  }

  correctAnswerVisualChanges = () => {
    document.querySelector(".answerSection").classList.remove("correctAnswer");
    this.setState({currentGuess: ""})
  }

  render() {
    return (
      <div className="answerSection">
        <button className="playBtn">Play <PlayBtn className="playBtnSvg" /></button>
        <input type="number" name="answer" id="answer" value={this.state.currentGuess} onChange={(e) => this.handleChange(e)}/>
      </div>
    )
  }
}
