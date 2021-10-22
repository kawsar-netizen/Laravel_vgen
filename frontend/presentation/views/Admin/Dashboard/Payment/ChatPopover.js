import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Avatar, Box } from "@material-ui/core";
import { Email } from "@material-ui/icons";

export default function ChatPopover({ handleClose, open, id, anchorEl }) {
  const classes = useStyles();

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box className={classes.popoverWrapper}>
        <Button className={classes.btn2} variant="contained">
          <Email className="mr-5" fontSize="small" /> Send Email
        </Button>
        <Box>
          <Avatar
            src="/assets/images/Images/client.jpg"
            className={classes.avatar}
          />
          <Typography align="center" variant="body2" color="textSecondary">
            487356
          </Typography>
          <Typography align="center" variant="subtitle1">
            John Smith
          </Typography>
        </Box>
        <Button className={classes.btn3} variant="contained">
          Start Conversation
        </Button>
      </Box>
    </Popover>
  );
}

const useStyles = makeStyles((theme) => ({
  popoverWrapper: {
    height: "400px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
  },
  btn2: {
    backgroundColor: "#529C16",
    color: "#fff !important",
    fontSize: "12px",
    width: "auto",
    "&:hover": { backgroundColor: "#529C16" },
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  btn3: {
    backgroundColor: "#529C16",
    color: "#fff !important",
    fontSize: "12px",
    width: "80%",
    "&:hover": { backgroundColor: "#529C16" },
    marginRight: "auto",
    marginLeft: "auto",
  },
  avatar: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "1rem",
  },
  avatarWrapper: {
    alignSelf: "center",
    flex: 1,
  },
}));
