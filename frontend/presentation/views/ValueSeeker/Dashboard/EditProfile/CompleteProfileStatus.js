import { Box, Typography } from "@material-ui/core";
import { getData } from "../../../../../handler/apiHandler";
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CompleteProfileStatus = () => {
  const [percentage, setPercentage] = useState(0);

  const getPercentage = () => {
    const token = cookie.get("seekerUser");
    getData(`/seeker/profile-percentage`, token).then((res) => {
      let result = res;
      setPercentage(result?.percentage);
    });
  };

  useEffect(() => {
    getPercentage();
  }, []);

  return (
    <Box style={{marginBottom:20}}>
      <div style={{display: "flex", justifyContent: "flex-end", marginBottom:20}}>
        <div
          style={{
            width: 120,
            height: 120
          }}
        >
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
      </div>
      <Typography align="right" variant="subtitle2">
        Your Profile
      </Typography>
      <Typography align="right" variant="body2">
        You cant place bid without 100% <br /> complete profile
      </Typography>
    </Box>
  );
};

export default CompleteProfileStatus;
