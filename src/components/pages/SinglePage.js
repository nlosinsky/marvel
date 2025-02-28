import AppBanner from "../appBanner/AppBanner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SinglePage = ({ component: View, dataType }) => {
  const {id} = useParams();
  const [data, setData] = useState(null);

  const { loading, error, getSingleComic, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, [id]);

  const onRequest = () => {

    if (!id) {
      return;
    }

    clearError();

    (dataType === 'comic' ? getSingleComic(id) : getCharacter(id))
      .then(onComicLoaded);
  }

  const onComicLoaded = (item) => {
    setData(item);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !data) ? <View data={data}/> : null;

  return (
    <>
      <AppBanner/>
      {errorMessage}
      {spinner}
      {content}
    </>
  )


};

export default SinglePage
