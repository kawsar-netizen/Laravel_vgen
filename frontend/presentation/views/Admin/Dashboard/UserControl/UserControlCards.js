import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CardActions from "@material-ui/core/CardActions";
import Link from "next/link";

const UserControlCards = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={3}>
        <Card elevation={0} className={classes.userControleCards}>
          <CardContent>
            <Box className="flex-between">
              <Typography gutterBottom variant="subtitle1">
                Admin Super User
              </Typography>
              <Typography variant="body2">See List</Typography>
            </Box>
            <Typography gutterBottom variant="h4">
              02
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card elevation={0} className={classes.userControleCards2}>
          <CardContent>
            <Box className="flex-between">
              <Typography gutterBottom variant="subtitle1">
                Admin
              </Typography>
              <Typography variant="body2">See List</Typography>
            </Box>
            <Typography gutterBottom variant="h4">
              10
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Link href="/admin/dashboard/user-control/add-admin">
              <Box className="flex-between w-100">
                <Typography gutterBottom variant="body1">
                  Add New Role
                </Typography>
                <PersonIcon />
              </Box>
            </Link>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card elevation={0} className={classes.userControleCards3}>
          <CardContent>
            <Box className="flex-between">
              <Typography gutterBottom variant="subtitle1">
                Manager
              </Typography>
              <Typography variant="body2">See List</Typography>
            </Box>
            <Typography gutterBottom variant="h4">
              15
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Link href="/admin/dashboard/user-control/add-manager">
              <Box className="flex-between w-100">
                <Typography gutterBottom variant="body1">
                  Add New Role
                </Typography>
                <PersonIcon />
              </Box>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default UserControlCards;

const useStyles = makeStyles({
  userControleCards: {
    backgroundColor: "#257CA6",
    borderRadius: "15px",
    color: "#fff !important",
    height: "100%",
    width: "auto",
  },
  userControleCards2: {
    backgroundColor: "#C44015",
    borderRadius: "15px",
    color: "#fff !important",
    height: "100%",
    width: "auto",
  },
  userControleCards3: {
    backgroundColor: "#65C256",
    borderRadius: "15px",
    color: "#fff !important",
    height: "100%",
    width: "auto",
  },
  cardActions: {
    // borderTop: "2px solid grey",
    borderTop: "1px solid rgba(128,128,128, 0.5)",
    cursor: "pointer",
    boxShadow: "0px 5px 10px rgba(0,0,0,0.7)",
  },
});
