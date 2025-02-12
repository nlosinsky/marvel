import { Component } from "react";

import mjolnirImg from '../../resources/mjolnir.png';

import './randomChar.scss';
import MarvelService from "../../services/MarvelService";

class RandomChar extends Component {
  state = {
    char: {
      name: null,
      description: null,
      thumbnail: null,
      homepage: null,
      wiki: null
    }
  };

  marvelService = new MarvelService();

  constructor(props) {
    super(props);
    this.loadChar();
  }

  loadChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getCharacter(id)
      .then((res) => this.onCharLoaded(res))
      .catch(() => this.onCharUnavailable())
  }

  onCharLoaded = (char) => {
    if (!char) {
      this.onCharUnavailable();
      return;
    }
    this.setState({ char })
  }

  onCharUnavailable = () => {
    this.setState({ char: null })
  }

  render() {
    const { name, description, thumbnail, homepage, wiki } = this.state.char || {};

    let randomCharContent =
      <>
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
          <p className="randomchar__name">{name}</p>
          <p className="randomchar__descr multiline-ellipsis">
            {description}
          </p>
          <div className="randomchar__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </>;

    if (!this.state.char) {
      randomCharContent = <p className="text-uppercase">Random character is not available</p>;
    }

    return (
      <div className="randomchar">
        <div className="randomchar__block">
          {randomCharContent}
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
        </div>
      </div>
    )
  }
}

export default RandomChar;
