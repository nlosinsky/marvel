import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import visionImg from '../../resources/vision.png';

const MainPage = () => {
  const [selectedChar, selectChar] = useState(null);

  const onCharSelected = (id) => {
    selectChar(id);
  }

  return (
    <>
      <RandomChar/>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected}/>
        </ErrorBoundary>

        <ErrorBoundary>
          <CharInfo charId={selectedChar}/>
        </ErrorBoundary>
      </div>

      <img className="bg-decoration" src={visionImg} alt="vision"/>
    </>
  )
};

export default MainPage;
