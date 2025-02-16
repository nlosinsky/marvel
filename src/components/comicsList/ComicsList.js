import './comicsList.scss';

const ComicsList = ({ comics }) => {
  const items = comics.map((item, i) => {
    return (
      <li key={i} className="char__comics-item">
        {item.name}
      </li>
    );
  });

  return (
    <>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : <span>There are no comics with this character</span>}
        {items}
      </ul>
    </>
  );
}

export default ComicsList;
