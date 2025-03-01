import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
    case 'loading':
      return newItemsLoading ? <Component/> : <Spinner/>;
    case 'confirmed':
      return <Component/>;
    case 'error':
      return <ErrorMessage/>;
    default:
      throw new Error('Unexpected process state');
  }
}


const CharList = (props) => {
  const itemsPerPage = 9;
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState(null);
  const { getAllCharacters, process, setProcess } = useMarvelService();

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
    setProcess('error');
    setNewItemsLoading(false);
  }

  const loadCharacters = (initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllCharacters(offset, itemsPerPage)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
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

  return (
    <div className="char__list">
      {setContent(process, () => renderItems(charList), newItemsLoading)}

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
