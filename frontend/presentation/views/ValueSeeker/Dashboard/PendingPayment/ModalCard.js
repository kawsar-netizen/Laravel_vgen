import { Box, Button, Card, Typography, withStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import styles from "./PendingPayment.module.css";
import Link from "next/link";
import CloseIcon from "@material-ui/icons/Close";

const ModalCard = ({ close }) => {
  return (
    <Card className={styles.modalCard}>
      <Box className="flex-end w-100">
        <CloseIcon onClick={close} fontSize="small" />{" "}
      </Box>
      <Typography gutterBottom align="center" variant="h6">
        Project Graphics Design
      </Typography>
      <Button size="small" variant="outlined" color="inherit">
        Contract Job
      </Button>
      {/* BODY: progress and apply num  */}

      <span className="flex-between w-100 pt-1">
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
        defaultValue={100}
      />
      <span
        style={{
          width: "100%",
          paddingBottom: "1rem",
        }}
      >
        <Typography align="right" variant="body2">
          100%
        </Typography>
      </span>

      {/* view post button */}
      <Box className="flex-between w-100">
        <Link href="/valueseeker/dashboard/pending-payment/payment">
          <Button
            className="m-1"
            size="small"
            variant="contained"
            color="inherit"
          >
            Go to payment
          </Button>
        </Link>
        <Link href="/valueseeker/dashboard/pending-payment/view-task">
          <Button
            className="m-1"
            size="small"
            variant="contained"
            color="primary"
          >
            View task
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default ModalCard;

const PrettoSlider = withStyles({
  root: {
    color: "#fff",
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
