import { useState } from "react";
import { Helmet } from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";

import visionImg from '../../resources/vision.png';

const MainPage = () => {
  const [selectedChar, selectChar] = useState(null);

  const onCharSelected = (id) => {
    selectChar(id);
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal"/>
        <title>Marvel information portal</title>
      </Helmet>

      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>

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
