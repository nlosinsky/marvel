import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './singleChar.scss';

const SingleChar = () => {
  const [char, setChar] = useState(null);
  const { charId } = useParams();

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [charId]);

  const onRequest = () => {

    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onComicLoaded);
  }

  const onComicLoaded = (char) => {
    setChar(char);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View comic={char}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ comic }) => {
  const { thumbnail, name, description } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default SingleChar;
