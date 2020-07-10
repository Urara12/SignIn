import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="navbar">
      <Link to="/" id="back_home">
        : main :
      </Link>
      <Link to="/signup" id="go_signup">
        : signup :
      </Link>
      <Link to="/authenticate" id="go_authenticate">
        : authenticate :
      </Link>
      <Link to="/signin" id="go_signin">
        : signin :
      </Link>
      <Link to="/signout" id="go_signout">
        : signout :
      </Link>
    </div>
  );
}
