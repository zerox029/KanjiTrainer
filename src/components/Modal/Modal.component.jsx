import React from 'react'
import './Modal.styles.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  closeModal = () => {
    document.querySelector(".modal").classList.remove("showModal");
  }

  invoke(action, version, params={}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject('failed to issue request'));
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (Object.getOwnPropertyNames(response).length !== 2) {
            throw 'response has an unexpected number of fields';
          }
          if (!response.hasOwnProperty('error')) {
            throw 'response is missing required error field';
          }
          if (!response.hasOwnProperty('result')) {
            throw 'response is missing required result field';
          }
          if (response.error) {
            throw response.error;
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });

      xhr.open('POST', 'http://127.0.0.1:8765');
      xhr.send(JSON.stringify({action, version, params}));
    });
  }

  fetchDecksList = async () => {
    const result = await this.invoke('deckNames', 6);
    console.log(`got list of decks: ${result}`);
  }

  render() {
    return (
      <div className="modal">
        <div className="modalContent">
            <span className="modalCloseButton" onClick={this.closeModal}>&times;</span>
            <h1 onClick={this.fetchDecksList}>Hello, I am a modal!</h1>
        </div>
      </div>
    )
  }
}
