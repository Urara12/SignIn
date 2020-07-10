import React from "react";

import { CognitoUserPool } from "amazon-cognito-identity-js";
import awsConfiguration from "./awsConfiguration";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const SignOut = () => {
  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.clear();
      console.log("signed out");
    } else {
      localStorage.clear();
      console.log("no user signing in");
    }
  };

  return (
    <div className="SignOut">
      <h1>SignOut</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
