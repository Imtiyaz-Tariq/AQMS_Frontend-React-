import { useRouteError } from "react-router-dom";
import '../Components/DataTable.css';

//import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <div className="outer-div">
        <h1>title={title}</h1>
        <p>{message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
