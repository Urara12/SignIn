import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import awsConfiguration from "./awsConfiguration.js";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const Authenticate = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);

  // 認証にはいらないけどこのページでSignInも行うのでパスワードを入力してもらう
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");

  const changeConfirmationCode = (event) => {
    setConfirmationCode(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const authenticate = () => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });
    cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("authentication succeeded");
      setConfirmationCode("");
      signIn();
    });
  };
  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("result : ", result);

        const userName = result.idToken.payload.name;
        const userId = result.idToken.payload["cognito:username"];
        dispatch({
          type: "SET_USERNAME",
          userName: userName,
        });
        dispatch({
          type: "SET_USERID",
          userId: userId,
        });

        dispatch({ type: "CHANGE_EMAIL", email: "" });
        setPassword("");
      },
      onFailure: (err) => {
        console.error(err);
      },
    });
  };
  return (
    <div className="Authenticate">
      <h1>Authenticate</h1>
      <input
        type="text"
        placeholder="confirmation code"
        onChange={changeConfirmationCode}
      />
      <input type="password" placeholder="password" onChange={changePassword} />
      <button onClick={authenticate}>Authenticate</button>
    </div>
  );
};

export default Authenticate;
