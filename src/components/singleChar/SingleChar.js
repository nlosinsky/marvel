import './singleChar.scss';
import { Helmet } from "react-helmet";

const SingleChar = ({ data }) => {
  const { thumbnail, name, description } = data;

  return (
    <div className="single-comic">

      <Helmet>
        <meta name="description" content={`${name} char`}/>
        <title>{name}</title>
      </Helmet>

      <img src={thumbnail} alt={name} className="single-comic__img"/>
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default SingleChar;
