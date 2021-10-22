import { Grid } from "@material-ui/core";
import styles from "./Signup.module.css";
import SignupLeft from "./SignupLeft";
import SignupRight from "./SignupRight";

const Signup = () => {
  return (
    <div className={styles.Signup}>
      <Grid container>
        <Grid item xs={12} lg={5} sm={6}>
          <SignupLeft />
        </Grid>
        <Grid item xs={12} lg={7} sm={6}>
          <SignupRight />
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
