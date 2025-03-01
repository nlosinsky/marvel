import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './comicsList.scss';

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

const ComicsList = ({ comics }) => {
  const itemsPerPage = 8;
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    loadComics(true);
  }, []);

  const loadComics = (initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

    getAllComics(offset, itemsPerPage)
      .then(onComicsListLoaded)
      .then(() => setProcess('confirmed'))
      .catch(onError)
  }

  const onComicsListLoaded = (newComicsList) => {
    const result = comicsList.concat(newComicsList);
    setComicsList(result);
    setNewItemsLoading(false);
    setOffset(result.length)
    setComicsEnded(newComicsList.length < itemsPerPage)
  }

  const onError = () => {
    setNewItemsLoading(false);
  }

  const renderItems = (comicsList) => {
    const list = comicsList.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })
    return (
      <ul className="comics__grid">
        {list}
      </ul>
    )
  }

  return (
    <div className="comics__list">
      {setContent(process, () => renderItems(comicsList), newItemsLoading)}

      <button onClick={() => loadComics(false)}
              disabled={newItemsLoading}
              style={{ display: comicsEnded ? 'none' : 'block' }}
              className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default ComicsList;
