import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';


class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemsLoading: false,
    error: false,
    offset: 0,
    itemsPerPage: 9,
    charEnded: false,
    selectedCharId: null
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.loadCharacters();
  }

  onCharListLoaded = (newCharList) => {
    this.setState(state => {
      const charList = state.charList.concat(newCharList);
      return {
        charList,
        loading: false,
        newItemsLoading: false,
        offset: charList.length,
        charEnded: newCharList.length < state.itemsPerPage
      }
    });
  }

  onCharListLoading = () => {
    this.setState({newItemsLoading: true});
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      newItemsLoading: false
    });
  }

  loadCharacters = () => {
    const { offset, itemsPerPage } = this.state;

    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset, itemsPerPage)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharSelected = (charId) => {
    this.setState({selectedCharId: charId});
    this.props.onCharSelected(charId);
  }

  renderItems = (charList) => {
    const list = charList.map(item => {
      let classes = "char__item";

      if (this.state.selectedCharId === item.id) {
        classes += ' char__item_selected';
      }

      return (
        <li className={classes}
            key={item.id}
            onClick={() => this.onCharSelected(item.id)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                this.onCharSelected(item.id)
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

  render() {
    const { charList, loading, error, newItemsLoading, charEnded} = this.state;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? this.renderItems(charList) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {content}
        {spinner}
        <button onClick={this.loadCharacters}
                disabled={newItemsLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
