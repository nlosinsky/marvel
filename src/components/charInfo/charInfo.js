import thorImg from '../../resources/thor.jpeg';

import './charInfo.scss';
import Skeleton from "../skeleton/skeleton";
import ComicsList from "../comicsList/comicsList";

const CharInfo = () => {
  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={thorImg} alt="abyss"/>
        <div>
          <div className="char__info-name">thor</div>
          <div className="char__btns">
            <a href="#" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="#" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother
        of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world
        serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the
        father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred
        to as the father of Váli in the Prose Edda.
      </div>
      <div className="char__comics">Comics:</div>
      <ComicsList />

      <p className="char__select">Please select a character to see information</p>

      <Skeleton />
    </div>
  );
}

export default CharInfo;
