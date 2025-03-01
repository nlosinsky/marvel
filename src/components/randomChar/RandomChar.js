import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import './randomChar.scss';

import mjolnirImg from '../../resources/mjolnir.png';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    loadChar();
  }, []);

  const loadChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  return (
    <div className="randomchar">
      {setContent(process, View, char)}

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

const View = ({ data }) => {
  if (!data) {
    return (
      <div className="randomchar__block">
        <p className="text-uppercase">Random character is not available</p>
      </div>
    )
  }

  const { name, description, thumbnail, homepage, wiki } = data;

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
