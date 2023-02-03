import { json, redirect } from 'react-router-dom';
import AuthForm from "../Components/AuthForm";
import '../Components/DataTable.css';

function Authentication() {
  return <div className='outer_div2'><AuthForm /></div>;
}

export default Authentication;
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "Login";

  if (mode !== "Login" && mode !== "Register") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(JSON.stringify(authData));
  const response = await fetch("https://aqms.azurewebsites.net/api/Users/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
    body: JSON.stringify(authData),
  });
  console.log(response);
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  //console.log(resData);
  //console.log(resData.body);
  const token = resData;
  console.log(token);
  
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
