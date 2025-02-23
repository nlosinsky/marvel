import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{'fontWeight': 'bold', 'textAlign': 'center', 'display': 'block'}}>Page not found!</p>
      <Link style={{'textAlign': 'center', 'display': 'block', 'marginTop': '30px'}} to="/">Back to main page</Link>
    </div>
  );
}

export default Page404;
