import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const {id} = useParams();
  const [data, setData] = useState(null);

  const { getSingleComic, getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [id]);

  const onRequest = () => {

    if (!id) {
      return;
    }

    clearError();

    (dataType === 'comic' ? getSingleComic(id) : getCharacter(id))
      .then(onComicLoaded)
      .then(() => setProcess('confirmed'));
  }

  const onComicLoaded = (item) => {
    setData(item);
  }

  return (
    <>
      <AppBanner/>
      {setContent(process, Component, data)}
    </>
  )


};

export default SinglePage
