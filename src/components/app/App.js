import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));

const App = () => {
  return (
   <Router>
     <div className="app">
       <AppHeader/>
       <main>
         <Suspense fallback={Spinner}>
           <Routes>
             <Route path="/" element={<MainPage />}></Route>
             <Route path="/comics" element={<ComicsPage />}></Route>
             <Route path="/comics/:comicId" element={<SingleComicPage />}></Route>
             <Route path="/char/:charId" element={<SingleCharPage />}></Route>
             <Route path="*" element={<Page404 />}></Route>
           </Routes>
         </Suspense>
       </main>
     </div>
   </Router>
  );
}

export default App;
