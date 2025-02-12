import errorImg from './error.gif';

const ErrorMessage = () => {
  return (
    <img src={errorImg} alt="Error" style={{width: 250, display: 'block', height: 250, objectFit: 'contain', margin: '0 auto'}}/>
  );
}

export default ErrorMessage;
