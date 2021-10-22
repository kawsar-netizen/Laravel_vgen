import React from "react";
import Slider from "@material-ui/core/Slider";
import { Button, Card, Typography, withStyles } from "@material-ui/core";
import styles from "./OngoingTaskCardDetails.module.css";
import FolderIcon from "@material-ui/icons/Folder";
import ForumIcon from "@material-ui/icons/Forum";

const OngoingTaskCardDetails = () => {
  return (
    <Card className={styles.ongoingTaskCardDetails}>
      <Typography gutterBottom align="center" variant="h6">
        Project Graphics Design
      </Typography>
      <Typography align="center" variant="body2">
        796126189
      </Typography>
      <Button variant="outlined" color="secondary">
        Contract Job
      </Button>
      <span
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingTop: "1rem",
        }}
      >
        <Typography align="left" variant="body2">
          Progress
        </Typography>
        <Typography align="right" variant="body2">
          4 days left
        </Typography>
      </span>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={80}
      />
      <span
        style={{
          width: "100%",
          paddingBottom: "1rem",
        }}
      >
        <Typography align="right" variant="body2">
          80%
        </Typography>
      </span>
      {/* Info */}
      <Typography gutterBottom align="center" variant="h6">
        Value Generator Info
      </Typography>

      <div
        style={{
          height: "40px",
          maxWidth: "40px",
          objectFit: "contain",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/images/Images/client.jpg"
          height="100%"
          width="100%"
        />
      </div>
      <Typography align="center" variant="body1">
        John Doe
      </Typography>
      <Typography gutterBottom align="center" variant="body2">
        Dhaka, Bangladesh
      </Typography>

      <Typography gutterBottom align="center" variant="h6">
        Project Budget
      </Typography>
      <Typography gutterBottom align="center" variant="h6">
        45$
      </Typography>

      <div className="flex">
        <Typography gutterBottom align="center" variant="h6">
          Files
        </Typography>
        <FolderIcon style={{ marginLeft: "1rem" }} />
      </div>
      <Typography gutterBottom align="center" variant="body2">
        image.png
      </Typography>
      <ForumIcon />
      <Typography gutterBottom align="center" variant="subtitle1">
        Chat with John Doe
      </Typography>
    </Card>
  );
};

export default OngoingTaskCardDetails;

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
