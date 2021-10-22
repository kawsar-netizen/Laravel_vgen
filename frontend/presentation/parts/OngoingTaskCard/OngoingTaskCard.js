import { Button, Card, Typography, withStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import styles from "./OngoingTaskCard.module.css";
import Link from "next/link";

const OngoingTaskCard = ({ jobs, type }) => {
  return (
    <Card className={styles.ongoingTaskCard}>
      <Typography gutterBottom align="center" variant="h6">
        Project{" "}
        <b style={{ color: "#57BBEB" }}>
          {jobs ? jobs.title : "Graphics Designer"}
        </b>
      </Typography>
      <Typography gutterBottom align="center" variant="body2">
        {jobs ? jobs.id : "768665"}
      </Typography>

      <Button size="small" variant="outlined" color="secondary">
        {jobs?.job_type}
      </Button>

      {/* BODY: progress and apply num  */}
      {type === "pending" ? (
        <>
          <div className="p-1"></div>
          <Typography variant="subtitle2" align="center">
            Total Apply
          </Typography>
          <Typography gutterBottom variant="h5" align="center">
            {jobs?.applyCount}
          </Typography>
        </>
      ) : (
        <>
          <span className="flex-between w-100 p-1">
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
          <span className="w-100 p-1">
            <Typography align="right" variant="body2">
              80%
            </Typography>
          </span>
        </>
      )}

      {/* Details Button */}
      {type === "pending" ? (
        <Link
          href="/valueseeker/dashboard/pending-selection/job-proposals/[id]"
          as={`/valueseeker/dashboard/pending-selection/job-proposals/${jobs?.id}`}
        >
          <button className={styles.taskBarButton1}>View Details</button>
        </Link>
      ) : (
        <Link href="/valueseeker/dashboard/task-details-page">
          <Button
            className="m-1"
            size="small"
            variant="contained"
            color="primary"
          >
            View Details
          </Button>
        </Link>
      )}

      {/* view post button */}
      {type === "pending" ? (
        <Link
          href="/valueseeker/dashboard/postedJob/[id]"
          as={`/valueseeker/dashboard/postedJob/${jobs?.id}`}
        >
          <button className={styles.taskBarButton2}>View Post</button>
        </Link>
      ) : null}
    </Card>
  );
};

export default OngoingTaskCard;

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
