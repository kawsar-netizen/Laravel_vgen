import { Grid } from "@material-ui/core";
import AdminSidebar from "../parts/AdminSidebar/AdminSidebar";
import styles from "./Layout.module.css";

const AdminLayout = (props) => {
  return (
    <Grid container>
      {/* sidebarLeft */}
      <Grid item md={2}>
        <AdminSidebar />
      </Grid>
      {/* body */}
      <Grid item md={10}>
        <div className={styles.layoutContent_wrapper}>{props.children}</div>
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
