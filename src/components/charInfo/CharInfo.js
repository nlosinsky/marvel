import { Component } from "react";

import Skeleton from "../skeleton/Skeleton";
import ComicsList from "../comicsList/ComicsList";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.loadChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.loadChar();
    }
  }

  loadChar = () => {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.onCharLoading();
    this.marvelService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  }

  onCharLoading = () => {
    this.setState({ loading: true });
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  }

  render() {
    const { loading, char, error } = this.state;
    const skeleton = (char || loading || error) ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;

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

      <ComicsList comics={comics} />
    </>
  )
}

export default CharInfo;
