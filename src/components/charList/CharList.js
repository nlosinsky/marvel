import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';


const CharList = (props) => {
  const itemsPerPage = 9;
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState(null);
  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    loadCharacters(true);
  }, []);

  const onCharListLoaded = (newCharList) => {
    const result = charList.concat(newCharList);
    setCharList(result);
    setNewItemsLoading(false);
    setOffset(result.length)
    setCharEnded(newCharList.length < itemsPerPage)
  }

  const onError = () => {
    setNewItemsLoading(false);
  }

  const loadCharacters = (initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllCharacters(offset, itemsPerPage)
      .then(onCharListLoaded)
      .catch(onError)
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
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="char__item"
        >
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
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>
          {list}
        </TransitionGroup>
      </ul>
    )
  }

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemsLoading ? <Spinner/> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button onClick={() => loadCharacters(false)}
              disabled={newItemsLoading}
              style={{ display: charEnded ? 'none' : 'block' }}
              className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
