import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "../components/box";
import { Button } from "../components/button";

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
    <Box
      css={{
        backgroundColor: "$white",
        color: "$black",
        fontSize: "$5",
        padding: "$4",
        marginLeft: "800px",
        marginTop: "400px",
      }}
    >
      <Button disabled={authenticating} onClick={() => signInWithSocialMedia()}>
        SignIn with Google
      </Button>
    </Box>
  );
};

export default LogInPage;
