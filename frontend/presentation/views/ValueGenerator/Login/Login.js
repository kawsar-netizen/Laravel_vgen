import { Grid } from "@material-ui/core";
import styles from "./Login.module.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

const Login = () => {
  return (
    <div className={styles.login}>
      <Grid container>
        <Grid item xs={12} lg={6} xl={6} sm={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={12} lg={6} xl={6}  sm={6}>
          <LoginRight />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
