import { Grid } from "@material-ui/core";
import styles from "./Login.module.css";
import LoginLeft from "./LoginRight";
import LoginRight from "./LoginLeft";

const AdminLogin = () => {
  return (
    <div className={styles.login}>
      <Grid container>
        <Grid item xs={12} lg={6} xl={6} sm={6}>
          <LoginLeft />
        </Grid>
        <Grid item xs={12} lg={6} xl={6} sm={6}>
          <LoginRight />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLogin;