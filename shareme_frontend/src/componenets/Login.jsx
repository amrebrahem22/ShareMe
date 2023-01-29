import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.removeItem("user");
    console.log("before set user: ", JSON.parse(localStorage.getItem("user")));
    console.log("response: ", response);
    let decoded = jwt_decode(response.credential);
    console.log("decoded: ", decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    console.log("after set user: ", JSON.parse(localStorage.getItem("user")));
    const { name, sub, picture } = decoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    console.log("new document: ", doc);

    client.createIfNotExists(doc).then((res) => {
      console.log("sanity respose: ", res);
      navigate("/");
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full h-full bg-blackOverlay">
        <div className="p-5">
          <img src={logo} alt="Logo" width="130px" />
        </div>

        <div className="shadow-2xl">
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            onSuccess={responseGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
