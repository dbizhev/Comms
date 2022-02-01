import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import IPageProps from "../interfaces/page.interface";
import { SignInWithSocialMedia } from "../modules/auth";

const LogInPage: React.FunctionComponent<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const signInWithSocialMedia = () => {
    if (error !== "") setError("");

    setAuthenticating(true);

    SignInWithSocialMedia()
      .then((result) => {
        history.push("/");
      })
      .catch((error) => {
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <div className="AuthLogin">
      <div className="auth-main-container">
        <div>
          <h1>Welcome to React App</h1>
          <p>Please Signup to continue by choosing one of the options below.</p>
        </div>
        <div className="auth-btn-wrapper">
          <button
            disabled={authenticating}
            onClick={() => signInWithSocialMedia()}
          >
            SignUp with Google
          </button>

          <Link to={`/`}>
            <button>Back To Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
