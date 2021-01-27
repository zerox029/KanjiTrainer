import React from 'react'
import './Modal.styles.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount = () => {
    this.populateDecksList();
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

  populateDecksList = async () => {
    let decks =  await this.invoke('deckNames', 6);
    let selectKanji = document.querySelector(".decksKanji");
    let selectVocab = document.querySelector(".decksVocab");

    decks.sort();
    for(let deck of decks) {
      let option = document.createElement("option");
      option.text = deck;
      option.value = deck;
      selectVocab.appendChild(option);
      selectKanji.appendChild(option.cloneNode(true));
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modalContent">
            <span className="modalCloseButton" onClick={this.closeModal}>&times;</span>
            <select name="decksKanji" className="decksKanji"></select>
            <select name="decksVocab" className="decksVocab"></select>
        </div>
      </div>
    )
  }
}
