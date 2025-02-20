import { useEffect, useState } from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';


const CharList = (props) => {
  const itemsPerPage = 9;
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState(null);

  const marvelService = new MarvelService();

  useEffect(() => {
    loadCharacters();
  }, []);

  const onCharListLoaded = (newCharList) => {
    const result = charList.concat(newCharList);
    setCharList(result);
    setLoading(false);
    setNewItemsLoading(false);
    setOffset(result.length)
    setCharEnded(newCharList.length < itemsPerPage)
  }

  const onCharListLoading = () => {
    setNewItemsLoading(true);
  }

  const onError = () => {
    setError(true);
    setLoading(false);
    setNewItemsLoading(false);
  }

  const loadCharacters = () => {
    onCharListLoading();

    marvelService.getAllCharacters(offset, itemsPerPage)
      .then(onCharListLoaded)
      .catch(onError);
  }

  const onCharSelected = (charId) => {
    setSelectedCharId(charId)
    props.onCharSelected(charId);
  }

  const renderItems = (charList) => {
    const list = charList.map(item => {
      let classes = "char__item";

      if (selectedCharId === item.id) {
        classes += ' char__item_selected';
      }

      return (
        <li className={classes}
            key={item.id}
            onClick={() => onCharSelected(item.id)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                onCharSelected(item.id)
              }
            }}
            tabIndex="0"
        >
          <img src={item.thumbnail} alt={item.name}/>
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return (
      <ul className="char__grid">
        {list}
      </ul>
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? renderItems(charList) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {content}
      {spinner}
      <button onClick={loadCharacters}
              disabled={newItemsLoading}
              style={{ display: charEnded ? 'none' : 'block' }}
              className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;
