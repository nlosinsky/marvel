import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';


class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService.getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (newCharList) => {
    this.setState({
      charList: newCharList,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  renderItems = (charList) => {
    const list = charList.map(item => {
      return (
        <li className="char__item" key={item.id}>
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

  render() {
    const { charList, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? this.renderItems(charList) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
