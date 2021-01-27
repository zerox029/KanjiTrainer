import React, { Component } from 'react';

import './Settings.styles.css';

export default class Settings extends Component {
  componentDidMount = () => {
    document.querySelector("#minimum").value = this.props.baseSettings.minimum;
    document.querySelector("#maximum").value = this.props.baseSettings.maximum;
    document.querySelector("#speed").value = this.props.baseSettings.speed;
    document.querySelector("#autoplay").checked = this.props.baseSettings.autoplay === "true";
  }

  resetSettings = () => {
    document.querySelector("#minimum").value = "0";
    document.querySelector("#maximum").value = "1000";
    document.querySelector("#speed").value = "1";
    document.querySelector("#autoplay").checked = true;

    this.props.reset();
  }

  render() {
    return (
      <div className="settings">
        <div className="bounds">
          <p className="settingName">Bounds</p>
          <div>
            <label htmlFor="minimum">Minimum: </label>
            <input type="number" name="minimum" id="minimum" placeholder="0" onChange={(e) => this.props.handleSettingsChange(e)} />
          </div>
          <div>
            <label htmlFor="minimum">Maximum: </label>
            <input type="number" name="maximum" id="maximum" placeholder="1000" onChange={(e) => this.props.handleSettingsChange(e)} />
          </div>
        </div>
        <div className="speed">
          <p className="settingName">Speed</p>
          <input type="number" name="speed" id="speed" placeholder="1" onChange={(e) => this.props.handleSettingsChange(e)} />
        </div>
        <div className="miscelaneous">
          <p className="settingName">Miscelaneous</p>
          <div>
            <label htmlFor="autoplay">Autoplay</label>
            <input type="checkbox" name="autoplay" id="autoplay" onChange={(e) => { this.props.handleSettingsChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              })
            }} defaultChecked/>
          </div>
          <input type="button" value="Reset" className="reset" onClick={this.resetSettings} />
        </div>
      </div>
    )
  }
}
