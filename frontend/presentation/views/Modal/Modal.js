import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TodayIcon from "@material-ui/icons/Today";
import CloseIcon from '@material-ui/icons/Close';
import { useContext } from 'react'
import { UserContext } from "../../../context/UserContext";
// import { UserContext } from "../../../context/UserContext";

const JobDetailsModal = ({ viewJobDetails, setModalIsOpen }) => {
    const [getClientName, setGetClientName] = useContext(UserContext)
    setGetClientName(viewJobDetails?.clientName)
  return (
    <div style={{ color: "white" }}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Typography gutterBottom variant="h6" align="left">
            Job Details
          </Typography>
         <CloseIcon onClick={() => setModalIsOpen(false)} fontSize="small" style={{cursor: "pointer"}}/>
      </div>
      <Typography gutterBottom variant="body2">
        {viewJobDetails?.description}
      </Typography>
      <Typography gutterBottom variant="h6" align="left">
        You can work from
      </Typography>
      <Typography gutterBottom variant="body2" align="left">
        {viewJobDetails?.youCanWorkFrom}
      </Typography>

      <Typography gutterBottom variant="h6" align="left">
        Required Skills
      </Typography>
      <Grid spacing={3} container>
        {viewJobDetails?.skills?.map((item) => (
          <Grid key={item} item md={3} xs={6}>
            <Button fullWidth variant="contained" color="secondary">
              {item.skill ? item.skill : <>No Data</>}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography
        gutterBottom
        variant="h6"
        align="left"
        style={{ marginTop: 20 }}
      >
        Other Deatils{" "}
      </Typography>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <div className="flex" style={{ marginRight: 30 }}>
          <LocationOnIcon
            style={{ color: "orange", marginRight: 10 }}
            fontSize="small"
          />
          <Typography variant="subtitle2">
            {viewJobDetails?.work_from}
          </Typography>
        </div>
        <div className="flex">
          <AttachMoneyIcon
            style={{ color: "orange", marginRight: 10 }}
            fontSize="small"
          />
          <Typography variant="subtitle2">
            Budget: {viewJobDetails?.budgetRange} $
          </Typography>
        </div>
      </div>
      <div className="flex">
        <TodayIcon
          style={{ color: "orange", marginRight: 10 }}
          fontSize="small"
        />
        <Typography variant="subtitle2">
          Time: {viewJobDetails?.time}
        </Typography>
      </div>
      <Typography
        gutterBottom
        variant="h6"
        align="left"
        style={{ marginTop: 20 }}
      >
        Client Deatils{" "}
      </Typography>
      <div style={{display: "flex"}}>
        <img
          src={
            viewJobDetails?.clientImg ||
            "/assets/images/Images/client.jpg"
          }
          style={{ 
              width: 40,
              height:40,
              backgroundSize:"cover",
              borderRadius: "50%",
              marginRight: 10
          }}
        />
        <div className="clientDetail">
          <strong>{viewJobDetails?.clientName}</strong>
          <p>{viewJobDetails?.country}</p>
          <small>Total Projects Completed: {viewJobDetails?.totalProjectCompleted}</small>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
