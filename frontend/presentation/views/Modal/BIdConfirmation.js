import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const BIdConfirmation = ({ bidConfirmation, setModalIsOpen, bidMessage }) => {
  console.log(bidConfirmation);
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Box
        style={{ backgroundColor: "#057E9B", borderRadius: "5px" }}
        p={4}
        mb={2}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white"
          }}
        >
          <Typography gutterBottom variant="subtitle1">
            To, <br /> {bidMessage?.seekerName}
          </Typography>
         <div style={{display:"flex", alignItems: "center"}}>
             <small>You have sent this message to <strong> {bidMessage?.seekerName}</strong></small>
              <CloseIcon
                onClick={() => setModalIsOpen(false)}
                fontSize="small"
                style={{ cursor: "pointer", marginLeft: 10 }}
              />
         </div>
        </div>

        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={bidMessage?.message}
          placeholder="Write here..."
          className="mb-5"
          style={{ backgroundColor: "#CFE2E7", marginBottom: "1rem" }}
        />
      </Box>
    </div>
  );
};

export default BIdConfirmation;
