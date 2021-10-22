import AdminLayout from "../../../../../Layout/AdminLayout";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import ProfileOption from "../../../../../parts/ProfileOption/ProfileOption";

const ValueSeekerProfile = () => {
  const classes = useStyles();
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        <Box className={classes.valueSeekerProfile}>
          {/* Avatar */}
          <Avatar
            src="/assets/images/Images/client.jpg"
            className={classes.avatar}
          />
          <Typography
            className={classes.percentage}
            align="center"
            variant="subtitle1"
          >
            Profile Completed : 100%
          </Typography>
          {/* details*/}
          <Box mt={2} mb={2}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((items) => (
                <Grid item key={items} lg={4}>
                  <Box>
                    <Typography
                      className={classes.infoType}
                      variant="subtitle1"
                    >
                      Full Name
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      John Doe
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/*skills*/}
          <Typography
            gutterBottom
            className={classes.infoType}
            variant="subtitle1"
          >
            Skiils
          </Typography>
          <Box mb={3}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((items) => (
                <Grid item key={items} xs={12} lg={3}>
                  <Box className={classes.skills}>
                    <Typography align="center" variant="body2">
                      Web development
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* nid card */}
          <Typography
            gutterBottom
            className={classes.infoType}
            variant="subtitle1"
          >
            NID Card
          </Typography>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <Image
                  src="/assets/images/Images/nid-front.jpg"
                  alt="Picture of the author"
                  layout="responsive"
                  width={500}
                  height={400}
                  className={classes.nidImg}
                />
                <Typography gutterBottom variant="body1">
                  FrontPage of NID
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Image
                  src="/assets/images/Images/nid.jpeg"
                  alt="Picture of the author"
                  layout="responsive"
                  width={500}
                  height={400}
                  className={classes.nidImg}
                />
                <Typography gutterBottom variant="body1">
                  BackPage of NID
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* action buttons */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Button variant="contained" className={classes.btn1}>
                Aprove
              </Button>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Button variant="contained" className={classes.btn2}>
                Decline
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default ValueSeekerProfile;

const useStyles = makeStyles({
  valueSeekerProfile: {
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  avatar: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    color: "#529C16",
    fontSize: "20px",
    marginBottom: "2rem",
  },
  infoType: {
    fontWeight: 500,
  },
  skills: {
    padding: "8px",
    borderRadius: "20px",
    backgroundColor: "#529C16",
    color: "#fff",
    fontWeight: 500,
  },
  btn1: {
    backgroundColor: "#529C16",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#529C16" },
  },
  btn2: {
    backgroundColor: "#EF621C",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  nidImg: {
    borderRadius: "5px",
  },
});
