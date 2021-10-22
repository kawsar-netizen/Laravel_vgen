import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FormInput from "../../../presentation/Components/Inputs/FormInput/FormInput";
import FormButton from "../../../presentation/Components/Buttons/FormButton/FormButton";
import styles from "./index.module.css";
import React, { useState } from "react";
import validation from "../../../validation/resetFormValidation";
import { server } from '../../../config/index'
import { useRouter } from "next/router";
const resetFormRight = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    token: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    setErrors(validation(values));
    event.preventDefault();
    const resetPassData = {
      token: values.token,
      password: values.password,
      confirm_password: values.confirm_password,
    };
    console.log(resetPassData);
    let result = await fetch(
      `${server}/seeker/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(resetPassData),
      }
    );
    result = await result.json();
    console.log(result);
    if(result.message && result.success === true){
      setSuccessMsg(result.message)
      setErrorMsg('')
      router.push("/valueseeker/login");
    }
    if(result.message && !result.success){
      setErrorMsg(result.message)
      setSuccessMsg('')
    }
  };
  return (
    <div className={styles.loginRight}>
      <h1>Reset your password</h1>
      <form className={styles.loginform}>
        <FormInput
          icon={<EmailIcon />}
          type="text"
          placeholder="Enter token"
          name="token"
          label="Token"
          value={values.token}
          onChange={handleChange}
        />
        {errors.token ? (<span className={styles.error}>{errors.token}</span>) : 
        <span className={styles.error}>{errorMsg}</span>}
        <FormInput
          icon={<LockIcon />}
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
        <FormInput
          icon={<LockIcon />}
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirm_password"
          value={values.confirm_password}
          onChange={handleChange}
        />
        {errors.confirm_password && (
                <span className={styles.error}>{errors.confirm_password}</span>
              )}
              <span style={{color: 'teal'}}>{successMsg}</span><br />
      </form>
      <FormButton onClick={handleFormSubmit} text="Reset Password" />
    </div>
  );
};

export default resetFormRight;
