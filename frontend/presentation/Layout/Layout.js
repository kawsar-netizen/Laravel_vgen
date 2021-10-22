import { Grid } from "@material-ui/core";
import SidebarLeft from "../parts/SidebarLeft/SidebarLeft";
import SidebarRight from "../parts/SidebarRight/SidebarRight";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Grid container>
      {/* sidebarRight */}
      <Grid item md={2}>
        <SidebarLeft />
      </Grid>
      {/* body */}
      <Grid item md={7}>
        <div className={styles.layoutContent_wrapper}>{props.children}</div>
      </Grid>
      {/* SidebarRight */}
      <Grid item md={3}>
        <SidebarRight />
      </Grid>
    </Grid>
  );
};

export default Layout;
