import { getAuth } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import IPageProps from "../interfaces/page.interface";

const auth = getAuth();

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <h1> Home Page - Protected</h1>
      <Link to={`/thread`}>
        <button>View Thread</button>
      </Link>
      <Link to={`/auth/login`}>
        <button onClick={logOut}>Logout</button>
      </Link>
    </div>
  );
};

export default HomePage;
