import { Checkbox } from "@material-ui/core";
import Link from "next/link";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FormInput from "../../../Components/Inputs/FormInput/FormInput";
import FormButton from "../../../Components/Buttons/FormButton/FormButton";
import styles from "./Login.module.css";
import FormTop from "../../../parts/FormTop/FormTop";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import validation from "../../ValueSeeker/Signup/Validation";
import { server } from "../../../../config/index";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import cookie from 'js-cookie'


const LoginRight = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      justifyContent: "center",
      marginBottom: 20,
      marginTop: -20,
    },
  }));
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [newPass, setNewPass] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    sessionStorage.getItem("seekerUser") ||
      (localStorage.getItem("seekerUser") &&
        router.push("/valueseeker/dashboard"));
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true)
    setErrors(validation(values));
    let credentials = {
      user_name: values.user_name,
      password: values.password,
    };
    let result = await fetch(`${server}/seeker/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
    result = await result.json();
    console.log(result);
    if (result.success === true) {
      sessionStorage.setItem("seekerUser", JSON.stringify(result));
      cookie.set("seekerUser", result.token);
      router.push("/valueseeker/dashboard");
      // console.log(JSON.parse(cookie.get('seekeUser')))
      console.log(result);
      setLoading(false)
      setSuccess(true)
    }
    if (result.success == false) {
      setLoginError(result.message);
      setLoading(false)
    }
  };
  const passwordHandle = async (e) => {
    e.preventDefault();
    setErrors(validation(values));
    let resetPassword = { email: values.email };
    console.log(resetPassword);
    let result = await fetch(`${server}/seeker/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(resetPassword),
    });
    result = await result.json();
    if (result) {
      setResetMessage(result.message);
    }
    console.log(result);
  };

  return (
    <div className={styles.loginRight}>
      <FormTop text="Login As Value Seeker" />

      {!newPass && (
        <form className={styles.loginform}>
          <FormInput
            icon={<EmailIcon />}
            type="text"
            placeholder="Email"
            name="user_name"
            value={values.user_name}
            label="Username or email"
            onChange={handleChange}
          />
          {errors.user_name && (
            <span className={styles.errorMessage}>{errors.user_name}</span>
          )}

          <FormInput
            icon={<LockIcon />}
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? (
            <span className={styles.errorMessage}>{errors.password}</span>
          ) : (
            <span className={styles.errorMessage}>{loginError}</span>
          )}

          <div className="">
            <Checkbox fontSize="small" />
            <span>Remember Me</span>
            <Checkbox onChange={() => setNewPass(!newPass)} fontSize="small" />
            <span>Forgot Password</span>
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {loading && (
              <div className={classes.root}>
                <CircularProgress />
              </div>
            )}
             {success && <p style={{color: 'teal', textAlign: 'center'}}>Logged in successfully</p>}
            <FormButton onClick={login} text="Login" />
            <br />
            Want an account? <br />
            <Link href="/valueseeker/signup">Sign up</Link>
          </div>
        </form>
      )}

      {/* password reset form  */}
      {newPass && (
        <form className={styles.loginform}>
          <h4 style={{ color: "teal", marginBottom: 20, textAlign: "left" }}>
            Enter your email to reset your password
          </h4>
          <FormInput
            icon={<EmailIcon />}
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            label="email"
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
          <span style={{ color: "teal" }}>{resetMessage}</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormButton
              onClick={passwordHandle}
              text="Send"
              style={{ marginTop: 10 }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                onChange={() => setNewPass(!newPass)}
                fontSize="small"
              />
              <span>
                <a>Login</a>
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginRight;
