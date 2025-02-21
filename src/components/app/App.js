import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import visionImg from '../../resources/vision.png';
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";


const App = () => {
  const [selectedChar, selectChar] = useState(null);

  const onCharSelected = (id) => {
    selectChar(id);
  }

  return (
    <div className="app">
      <AppHeader/>
      <main>
        {/*<RandomChar/>*/}
        {/*<div className="char__content">*/}
        {/*  <ErrorBoundary>*/}
        {/*    <CharList onCharSelected={onCharSelected}/>*/}
        {/*  </ErrorBoundary>*/}

        {/*  <ErrorBoundary>*/}
        {/*    <CharInfo charId={selectedChar}/>*/}
        {/*  </ErrorBoundary>*/}
        {/*</div>*/}

        {/*<img className="bg-decoration" src={visionImg} alt="vision"/>*/}

        <AppBanner />
        <ComicsList />
      </main>
    </div>
  );
}

export default App;
