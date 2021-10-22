import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
import ChatPopover from "./ChatPopover";

function createData(
  userID,
  name,
  profileCreated,
  profileUpdated,
  profileStatus
) {
  return { userID, name, profileCreated, profileUpdated, profileStatus };
}

const rows = [
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "100%",
    "active"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "100%",
    "deactive"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "100%",
    "active"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "100%",
    "active"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "100%",
    "active"
  ),
];

export default function PaymentList() {
  const classes = useStyles();
  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Profile Created</TableCell>
              <TableCell align="center">Profile Updated</TableCell>
              <TableCell align="center">Account Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.userID}>
                <TableCell align="left">
                  <Typography className={classes.regularData}>
                    {row.userID}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.regularData}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.regularData}>
                    {row.profileCreated}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.updateStatus}>
                    {row.profileUpdated}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box className="center">
                    <Box className={classes.activeDot} mr={1} />
                    <Typography className={classes.activeStatus}>
                      {row.profileStatus}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box className="flex-around">
                    <Link href="/admin/dashboard/value-seeker-profile">
                      <Button
                        color="inherit"
                        variant="contained"
                        className={classes.btn1}
                        size="small"
                      >
                        View Info
                      </Button>
                    </Link>

                    <Button
                      color="inherit"
                      variant="contained"
                      className={classes.btn2}
                      size="small"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      Contact
                    </Button>

                    <Button
                      color="inherit"
                      variant="contained"
                      className={classes.btn3}
                      size="small"
                    >
                      Decline
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ChatPopover handleClose={handleClose} open={open} id={id} anchorEl={anchorEl} />
    </>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  btn1: {
    backgroundColor: "#155475",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#155475" },
  },
  btn2: {
    backgroundColor: "#529C16",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#529C16" },
  },
  btn3: {
    backgroundColor: "#EF621C",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  tableHead: {
    backgroundColor: "#F2F2F2",
  },
  updateStatus: {
    color: "#529C16",
    fontSize: "12px",
    fontWeight: 500,
  },
  activeStatus: {
    fontSize: "12px",
    display: "inline-block",
    color: "#fff",
    fontWeight: 500,
    borderRadius: "20px",
    color: "#529C16",
  },
  regularData: {
    fontSize: "12px",
    fontWeight: 500,
  },
  activeDot: {
    height: "10px",
    width: "10px",
    borderRadius: "50%",
    backgroundColor: "#529C16",
  },
});
