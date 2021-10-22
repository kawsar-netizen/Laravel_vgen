import React from "react";
import ResetFormLeft from "./ResetFormLeft";
import ResetFormRight from "./ResetFormRight";
import styles from './index.module.css'
import { Grid } from "@material-ui/core";
const resetForm = () => {
  return (
    <div className={styles.login}>
      <Grid container>
        <Grid item xs={12} lg={5} sm={6}>
          <ResetFormLeft />
        </Grid>
        <Grid item xs={12} lg={7} sm={6}>
          <ResetFormRight />
        </Grid>
      </Grid>
    </div>
  );
};

export default resetForm;
