import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

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
    props.onCharSelected(charId);
  }

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  const renderItems = (charList) => {
    console.log('render');
    const list = charList.map((item, i) => {
      let classes = "char__item";

      return (
        <li className={classes}
            key={item.id}
            ref={el => itemRefs.current[i] = el}
            onClick={() => {
              onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                onCharSelected(item.id);
                focusOnItem(i);
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

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemsLoading);
  }, [process]);

  return (
    <div className="char__list">
      {elements}

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
