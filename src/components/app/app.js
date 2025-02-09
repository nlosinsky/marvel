import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";

import visionImg from '../../resources/vision.png';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>

        <img className="bg-decoration" src={visionImg} alt="vision"/>
      </main>
    </div>
  );
}

export default App;
