import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import FormInput from "../../../Components/Inputs/FormInput/FormInput";
import FormButton from "../../../Components/Buttons/FormButton/FormButton";
import styles from "./Login.module.css";
import FormTop from "../../../parts/FormTop/FormTop";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { server } from "../../../../config/index";
import cookie from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoginLeft = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const [admin, setAdmin] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setAdmin(event.target.value);
  };

  useEffect(() => {
    const adminSession =
      cookie.get("adminUser") || sessionStorage.getItem("adminUser");
    adminSession && router.push("/admin/dashboard");
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    let credentials = { user_name: email, password: password };
    console.log(credentials);
    let result = await fetch(`${server}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
    result = await result.json();
    if (result.success === true) {
      sessionStorage.setItem("adminUser", JSON.stringify(result));
      cookie.set("adminUser", result.token);
      router.push("/admin/dashboard");
      setSuccess(true);
      setLoading(false);
    }
    if (!result.success) {
      setLoginError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginRight}>
      <Typography
        style={{ marginBottom: "20px", fontWeight: "500" }}
        variant="h3"
        gutterBottom
      >
        Admin Panel
      </Typography>
      <Typography
        style={{ marginBottom: "10px", fontWeight: "500" }}
        variant="h5"
        gutterBottom
      >
        Login As
      </Typography>

      <FormControl style={{ minWidth: "120px" }}>
        <InputLabel id="demo-simple-select-label">Admin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={admin}
          onChange={handleChange}
          variant="outlined"
          style={{
            backgroundColor: "#ADD6F6",
            color: "#fff !important",
            fontWeight: "bold",
          }}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"super-admin"}>SuperAdmin</MenuItem>
        </Select>
      </FormControl>

      <form className={styles.loginform}>
        <FormInput
          icon={<EmailIcon />}
          type="text"
          placeholder="Email"
          name="user_name"
          label="Username or email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          icon={<LockIcon />}
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <strong className={styles.errorMessage}>{loginError}</strong>
        <div className="center">
          <Checkbox fontSize="small" />
          <span>Remember Me</span>
        </div>
      </form>
      {loading && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
      {success && <p style={{color: 'teal', textAlign: 'center'}}>Logged in successfully</p>}
      <FormButton onClick={login} text="Login" />
    </div>
  );
};

export default LoginLeft;
