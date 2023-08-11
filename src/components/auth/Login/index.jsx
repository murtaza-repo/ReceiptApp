import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/footer-logo.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.accessToken, user, { user });
        localStorage.setItem("authToken", user.accessToken);
        navigate("/receipt");
        // ...
      })
      .catch((error) => {

        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        toast.error(
          errorMessage.includes("wrong-password")
            ? "Wrong Credentials!"
            : errorMessage.includes("user-not-found")
            ? "Invalid user!"
            : "Something went wrong!",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  };

  //   useEffect(()=>{
  //     if(localStorage.getItem("token")){
  //       navigate("/receipt", {replace:true})
  //     }

  // }, [])

  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    if (authToken && authToken.length > 0) {
      navigate("/receipt", {replace: true});
    }

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center">
                <div className="logo-img">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <form onSubmit={onSubmit}>
                  <h3>Login</h3>

                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <p className="forgot-password text-right">
                    <a href="#password">Forgot password?</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
