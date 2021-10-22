import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Slider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useStyles } from "../BaseStyles/BaseStyles";
import {useState, useRef, useEffect} from "react";

const WorkDetails = ({ singleWorkDetails }) => {
  const classes = useStyles();

  const [timerDay, setTimerDay] = useState(0);
  const [timerHour, setTimerHour] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerSecond, setTimerSecond] = useState(0);

  let interval = useRef()

  const startTimer = () =>{
    // const dateValue = singleWorkDetails?.WorkDetails?.endDate.toLocaleDateString()
    const countDownTIme = new Date("2021-10-11 03:52:52").getTime()

    interval = setInterval(() => {
      const now = new Date().getTime()
      const duration = countDownTIme - now;

      const days = Math.floor(duration / (1000 * 60 * 60 * 24))
      const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mins = Math.floor((duration % (1000 * 60 * 60 )) / (1000 * 60))
      const secs = Math.floor((duration % (1000 * 60)) / 1000)

      if(duration < 0){
        clearInterval(interval.current)
      }else{
        setTimerDay(days)
        setTimerHour(hours)
        setTimerMinute(mins)
        setTimerSecond(secs)
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer()
    return () =>{
      clearInterval(interval.current)
    }
  })

  return (
    <Box mt={3} mb={3}>
      <Grid spacing={5} container>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Showing Details for work</Typography>
          <Typography gutterBottom color="primary" variant="subtitle1">
            {singleWorkDetails?.WorkDetails?.jobTitle}
          </Typography>
          <Typography color="primary" variant="body2">
            {singleWorkDetails?.WorkDetails?.JobId}
          </Typography>
          <Box mb={3} mt={1} className="flex">
            <Button variant="outlined">
              {singleWorkDetails?.WorkDetails?.jobType}
            </Button>
            <Typography
              className="ml-5"
              gutterBottom
              color="primary"
              variant="subtitle2"
            >
              View Job Details
            </Typography>
          </Box>

          <Grid spacing={4} container>
            <Grid  item xs={12} lg={3} md={3}>
              <Card className={classes.timeCard}>
                <Typography variant="h6">{timerDay} Days</Typography>
              </Card>
            </Grid>
            <Grid  item xs={12} lg={3} md={3}>
              <Card className={classes.timeCard}>
                <Typography variant="h6">{timerHour} Hours</Typography>
              </Card>
            </Grid>
            <Grid  item xs={12} lg={3} md={3}>
              <Card className={classes.timeCard}>
                <Typography variant="h6">{timerMinute} Mins</Typography>
              </Card>
            </Grid>
            <Grid  item xs={12} lg={3} md={3}>
              <Card className={classes.timeCard}>
                <Typography variant="h6">{timerSecond} Sec</Typography>
              </Card>
            </Grid>
          </Grid>

          <Box mt={3} mb={3}>
            <Typography align="left" variant="body2">
              Progress
            </Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={singleWorkDetails?.WorkDetails?.progress}
            />
            <Typography align="right" variant="body2">
              {singleWorkDetails?.WorkDetails?.progress} %
            </Typography>
          </Box>

          <Grid spacing={4} container>
            <Grid item xs={12} lg={6} md={6}>
              <Typography align="left" variant="subtitle1">
                Task Status
              </Typography>
              <Box className={classes.skills}>
                <Typography align="center" variant="body2">
                  {singleWorkDetails?.WorkDetails?.status}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <Typography align="left" variant="subtitle1">
                Payment Status
              </Typography>
              <Box className={classes.skills}>
                <Typography align="center" variant="body2">
                  {singleWorkDetails?.WorkDetails?.paymentStatus}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* right */}
          <Typography gutterBottom color="primary" variant="subtitle1">
            Client Feedback
          </Typography>
          {(singleWorkDetails?.WorkRating?. rating || singleWorkDetails?.WorkRating?. comment) ? 
          (<Box mt={2} className={classes.rating}>
            <Rating size="small" name="read-only" value={singleWorkDetails?.WorkRating?. rating} readOnly />
            <Typography gutterBottom variant="subtitle2">
            {singleWorkDetails?.WorkRating?. comment}
            </Typography>
          </Box>) : (
            <Box mt={2} className={classes.rating}>
            <Rating size="small" name="read-only" value={5} readOnly />
            <Typography gutterBottom variant="subtitle2">
              This guy worked really great
            </Typography>
          </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkDetails;

const PrettoSlider = withStyles({
  root: {
    color: "#ff8800",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
