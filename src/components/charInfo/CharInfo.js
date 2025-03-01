import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

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
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
}

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  const getComicId = (comic) => {
    if (!comic.resourceURI) {
      return null;
    }
    const val = comic.resourceURI.split('/').pop();

    if (typeof parseInt(val) !== 'number') {
      return null;
    }

    return val;
  }

  const comicsItems = comics.map((item, i) => {
    const comicId = getComicId(item);
    return (
      <li key={i} className="char__comics-item">
        {comicId ? <Link to={`/comics/${comicId}`}>{item.name}</Link> : item.name}
      </li>
    );
  });

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name}/>
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

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;
