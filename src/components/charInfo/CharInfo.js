import { useEffect, useState } from "react";

import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    loadChar();
  }, [props.charId]);

  const loadChar = () => {
    const { charId } = props;

    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded);
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const skeleton = (char || loading || error) ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const comicsItems = comics.map((item, i) => {
    return (
      <li key={i} className="char__comics-item">
        {item.name}
      </li>
    );
  });

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss"/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>

      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : <span>There are no comics with this character</span>}
        {comicsItems}
      </ul>
    </>
  )
}

export default CharInfo;
