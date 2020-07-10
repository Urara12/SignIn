import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import awsConfiguration from "./awsConfiguration.js";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const SignUp = () => {
  const dispatch = useDispatch();

  // Passwordなどは別ページからアクセスできないようにするため、あえてReactでのState管理
  // Emailは次の認証で入力しなくていいようReduxで管理
  const email = useSelector((state) => state.email);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeEmail = (event) => {
    dispatch({ type: "CHANGE_EMAIL", email: event.target.value });
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const signUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: name,
      }),
    ];
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err);
        return;
      } else {
        setPassword("");
        setName("");
        alert("メールアドレスに認証コードを送信しました");
        // ここで認証のページに移動
      }
    });
  };

  return (
    <div className="SignUp">
      <h1>SignUp</h1>
      <input type="text" placeholder="name" onChange={changeName} />
      <input type="text" placeholder="email" onChange={changeEmail} />
      <input type="password" placeholder="password" onChange={changePassword} />
      <button onClick={signUp}>SignUp</button>
    </div>
  );
};

export default SignUp;
