import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Link from "next/link";

const CompletedTaskCard = () => {
  const classes = useStyle();
  return (
    <Card elevation={0} className={classes.completedTaskCard}>
      <CardContent>
        {/* first row */}
        <Grid container>
          <Grid item xs={6}>
            <Box className="flex">
              <Typography variant="subtitle1">
                Project UI & UX Design
              </Typography>
              <Button
                className="ml-5"
                size="small"
                variant="outlined"
                color="primary"
              >
                Contractual Job
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="flex-end">
              <Typography variant="subtitle2">1027125162</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box m={2}></Box>
        {/* second row */}
        <Grid container>
          <Grid item xs={5}>
            <Box className="flex-between">
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="secondary"
              >
                Completed
              </Button>
              <Button
                className="ml-5"
                fullWidth
                size="small"
                variant="contained"
              >
                Payment Recived
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box className="flex-end">
              <Link href="/valuegenerator/dashboard/completed-task/view-details">
                <Button size="small" color="primary">
                  View Details
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompletedTaskCard;

const useStyle = makeStyles({
  completedTaskCard: {
    backgroundColor: "#eef7fd",
    margin: "1rem 0rem 1rem 0rem",
  },
});
