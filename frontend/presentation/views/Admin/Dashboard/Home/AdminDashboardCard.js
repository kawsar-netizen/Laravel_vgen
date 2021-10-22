import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import styles from "./AdminDashboardHome.module.css";

const AdminDashboardCard = () => {
  return (
    <>
      <Grid item xs={12} md={3}>
        <Card
          elevation={0}
          style={{
            backgroundColor: "#6B66DD",
            borderRadius: "15px",
          }}
          className={styles.adminDashboardCard}
        >
          <CardContent>
            <BusinessCenterIcon />
            <Typography gutterBottom variant="h5">
              158981
            </Typography>
            <Typography variant="body2">Job Posted</Typography>
            <Typography gutterBottom variant="body2">
              ......
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          elevation={0}
          style={{
            backgroundColor: "#5AAA17",
            borderRadius: "15px",
          }}
          className={styles.adminDashboardCard}
        >
          <CardContent>
            <BusinessCenterIcon />
            <Typography gutterBottom variant="h5">
              1598
            </Typography>
            <Typography variant="body2">Active jobs</Typography>
            <Typography gutterBottom variant="body2">
              ......
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          elevation={0}
          style={{
            backgroundColor: "#114A68",
            borderRadius: "15px",
          }}
          className={styles.adminDashboardCard}
        >
          <CardContent>
            <BusinessCenterIcon />
            <Typography gutterBottom variant="h5">
              120
            </Typography>
            <Typography variant="body2">Pending Jobs</Typography>
            <Typography gutterBottom variant="body2">
              ......
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          elevation={0}
          style={{
            backgroundColor: "#4D9E6F",
            borderRadius: "15px",
          }}
          className={styles.adminDashboardCard}
        >
          <CardContent>
            <BusinessCenterIcon />
            <Typography gutterBottom variant="h5">
              158981
            </Typography>
            <Typography variant="body2">Completed Jobs</Typography>
            <Typography gutterBottom variant="body2">
              ......
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default AdminDashboardCard;
