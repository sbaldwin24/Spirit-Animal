import React from "react";
import { auth, googleAuthProvider } from "./firebase";

class SignIn extends React.Component {
  render() {
    return (
      <div className="SignIn">
        <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
          Sign In
        </button>
      </div>
    );
  }
}

export default SignIn;
