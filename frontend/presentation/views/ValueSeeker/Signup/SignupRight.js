import Link from "next/link";
import EmailIcon from "@material-ui/icons/Email";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormButton from "../../../Components/Buttons/FormButton/FormButton";
import LockIcon from "@material-ui/icons/Lock";
import styles from "./Signup.module.css";
import FormTop from "../../../parts/FormTop/FormTop";
import SignupInput from "../../../Components/Inputs/Input/Input";
import { Grid, Container } from "@material-ui/core";
import React, { useState } from "react";
import { server } from "../../../../config/index";
import validation from "./Validation";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignupRight = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      justifyContent: "center",
      marginTop: 30,
    },
  }));
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    setErrors(validation(values));
    setLoading(true);
    event.preventDefault();
    const signupData = {
      first_name: values.first_name,
      last_name: values.last_name,
      user_name: values.user_name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    console.log(signupData);
    let result = await fetch(`${server}/seeker/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signupData),
    });
    result = await result.json();
    console.log(result);
    if (result.success && result.success !== false) {
      console.log("server side response", result);
      setIsError("");
      setEmailError("");
      setSendingEmail(true);
      setLoading(false);
      // router.push("/valueseeker/login");
    } else {
      setIsError(result.user_name);
      setEmailError(result.email ? result.email : "");
      setSendingEmail(false);
      setLoading(false);
    }
  };
  return (
    <div className={styles.signupRight}>
      <Container maxWidth="sm">
        <FormTop text="Create Account As Value Seeker" />
        <form className={styles.signupform}>
          <Grid
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
          >
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="First name"
                label="First name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <p className={styles.error}>{errors.first_name}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="Last name"
                label="Last name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
              {errors.last_name && (
                <p className={styles.error}>{errors.last_name}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="Username"
                label="Username"
                name="user_name"
                value={values.user_name}
                onChange={handleChange}
              />
              {errors.user_name ? (
                <p className={styles.error}>{errors.user_name}</p>
              ) : (
                <p className={styles.error}>{isError}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<EmailIcon fontSize="small" />}
                type="text"
                placeholder="Email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email ? (
                <p className={styles.error}>{errors.email}</p>
              ) : (
                <p className={styles.error}>{emailError}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<LockIcon fontSize="small" />}
                type="text"
                placeholder="Password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: 100 }}>
              <SignupInput
                icon={<LockIcon fontSize="small" />}
                type="text"
                placeholder="Confirm Password"
                label="Confirm Password"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
              />
              {errors.password_confirmation && (
                <p className={styles.error}>{errors.password_confirmation}</p>
              )}
            </Grid>
          </Grid>
          {loading && (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          )}
          {sendingEmail && (
            <p style={{ color: "teal" }}>
              Email verification link has been sent. Check your email
            </p>
          )}
          <FormButton
            style={{ marginTop: 30 }}
            onClick={handleFormSubmit}
            text="sign up"
          />
        </form>
        <div className={styles.formBottom}>
          Already Have an account? <br />
          <Link href="/valueseeker/login">Login</Link>
        </div>
      </Container>
    </div>
  );
};

export default SignupRight;
