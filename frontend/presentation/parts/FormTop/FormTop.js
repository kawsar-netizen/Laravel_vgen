import { Paper, Typography } from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import styles from "./FormTop.module.css";
import { postData } from "../../../handler/apiHandler";
import { googleClientId, facebookAppId } from "../../../config";
import { Facebook } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import cookie from 'js-cookie'

const FormTop = ({ text }) => {
  const router = useRouter();

  //send response data to server
  const signUp = (res, type) => {
    let userInfo;
    if (type === "google" && res.profileObj) {
      userInfo = {
        username: res.profileObj.name,
        provider: type,
        email: res.profileObj.email,
        avatar: res.profileObj.imageUrl,
        id: res.profileObj.googleId,
      };
    }
    if (type === "facebook" && res.email) {
      userInfo = {
        username: res.name,
        provider: type,
        email: res.email,
        avatar: res.picture.data.url,
        id: res.id,
      };
    }
    console.log(userInfo);

    if (
      router.pathname === "/valueseeker/login" ||
      router.pathname === "/valueseeker/signup"
    ) {
      postData(`/seeker/login/${type}/callback`, userInfo).then((result) => {
        let responseJSON = result;
        console.log(responseJSON);
        if (responseJSON.success === true) {
          sessionStorage.setItem("seekerUser", JSON.stringify(responseJSON));
          cookie.set("seekerUser", responseJSON.token);
          router.push("/valueseeker/dashboard");
        }
        
      });
    }

    if (
      router.pathname === "/valuegenerator/login" ||
      router.pathname === "/valuegenerator/signup"
    ) {
      postData(`/generator/login/${type}/callback`, userInfo).then((result) => {
        let responseJSON = result;
        if (responseJSON.success === true) {
          sessionStorage.setItem("generatorUser", JSON.stringify(responseJSON));
          cookie.set("generatorUser", responseJSON.token);
          router.push("/valuegenerator/dashboard");
        }
      });
    }
  };

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    signUp(response, "google");
  };

  const responseFacebook = (response) => {
    console.log(response);
    signUp(response, "facebook");
  };

  return (
    <div className={styles.formTop}>
      <Typography
        style={{ marginBottom: "10px", fontWeight: "500" }}
        variant="h4"
      >
        {text}
      </Typography>
      <div className={`${styles.formtopwrapper}`}>
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId={facebookAppId}
          // autoLoad={true}
          textButton={<span>Login with Facebook</span>}
          cssClass={styles.facebook}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<Facebook style={{ marginRight: 10 }} />}
        />
      </div>
    </div>
  );
};

export default FormTop;
