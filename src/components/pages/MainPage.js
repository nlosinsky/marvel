import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import visionImg from '../../resources/vision.png';
import CharSearchForm from "../charSearchForm/CharSearchForm";

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

        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>

          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>
        </div>

      </div>

      <img className="bg-decoration" src={visionImg} alt="vision"/>
    </>
  )
};

export default MainPage;
