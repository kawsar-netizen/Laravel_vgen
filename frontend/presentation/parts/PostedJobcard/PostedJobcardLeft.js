import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
// import { useContext } from "react";
// import { UserContext } from "../../../context/UserContext";
import styles from "./PostedJobcard.module.css";

const PostedJobcardLeft = ({ job, jobDetails, bid, bidConfirmation }) => {
  // const [bidConfirmation, setBidConfirmation] = useContext(UserContext);
  return (
    <div className={styles.postedJobcardLeft}>
      <div
        style={{
          height: "40px",
          maxWidth: "40px",
          objectFit: "contain",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "10px auto",
        }}
      >
        <img
          src={job?.image || jobDetails?.seekerImg || bid?.seekerImg || bidConfirmation?.seekerImg || "/assets/images/Images/client.jpg"}
          height="100%"
          width="100%"
        />
      </div>
      {/* star rating */}
      <Box component="fieldset" mb={1} borderColor="transparent">
        <Typography align="center" component="legend">
         {job?.name || jobDetails?.jobTitle || bid?.title || bidConfirmation?.title}
        </Typography>
        <Rating size="small" name="read-only" value={bid?.rating || bidConfirmation?.rating} readOnly />
      </Box>
      <Typography align="center" variant="body2">
        Projects
      </Typography>
      <Typography gutterBottom align="center" variant="subtitle1">
        {job?.projectsCount || jobDetails?.projectsCount || bid?.projectsCount || bidConfirmation?.projectsCount}
      </Typography>
      <Box mt={3}>
        <Typography align="center" variant="body2">
          Country
        </Typography>
        <Typography align="center" variant="body1">
          {job?.country || jobDetails?.country_code || bid?.country || bidConfirmation?.country}
        </Typography>
      </Box>
    </div>
  );
};

export default PostedJobcardLeft;
