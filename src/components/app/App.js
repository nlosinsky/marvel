import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));
const SingleComic = lazy(() => import("../singleComic/SingleComic"));
const SingleChar = lazy(() => import("../singleChar/SingleChar"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Suspense fallback={Spinner}>
            <Routes>
              <Route path="/" element={<MainPage/>}></Route>
              <Route path="/comics" element={<ComicsPage/>}></Route>
              <Route path="/comics/:id" element={<SinglePage Component={SingleComic} dataType="comic"/>}></Route>
              <Route path="/characters/:id" element={<SinglePage Component={SingleChar} dataType="character"/>}></Route>
              <Route path="*" element={<Page404/>}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
