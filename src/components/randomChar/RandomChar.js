import { Component, useEffect, useState } from "react";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from "../../services/MarvelService";

import './randomChar.scss';

import mjolnirImg from '../../resources/mjolnir.png';

const RandomChar = (props) => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    loadChar();
  }, []);

  const loadChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    onCharLoading();
    marvelService.getCharacter(id)
      .then(onCharLoaded)
      .catch(onError)
  }

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  }

  const onCharLoading = () => {
    setLoading(true);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? <View char={char}/> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button onClick={loadChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnirImg} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}

const View = ({ char }) => {
  if (!char) {
    return (
      <div className="randomchar__block">
        <p className="text-uppercase">Random character is not available</p>
      </div>
    )
  }

  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
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
    </div>
  );

}

export default RandomChar;
