import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import WorkDetails from "./WorkDetails";
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
    "4 weeks",
    "completed"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "5 days",
    "deactive"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "4 weeks",
    "completed"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "4 weeks",
    "completed"
  ),
  createData(
    452372533,
    "John Smith",
    new Date().toLocaleDateString(),
    "4 weeks",
    "completed"
  ),
];

export default function WorkHistory() {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="center">Value Seeker Name</TableCell>
              <TableCell align="center">Projects Duration</TableCell>
              <TableCell align="center">Profile Start</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Action</TableCell>
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
                  <Typography className={classes.updateStatus}>
                    {row.profileUpdated}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.regularData}>
                    {row.profileCreated}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.updateStatus}>
                    5428 $
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
                <TableCell align="center">
                  <Box className="center">
                    <Box className={classes.activeDot} mr={1} />
                    <Typography className={classes.activeStatus}>
                      {row.profileStatus}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex-around w-100 ">
                    <Link href="/admin/invoice">
                      <Button
                        color="inherit"
                        variant="contained"
                        className={classes.btn3}
                        size="small"
                      >
                        Invoice
                      </Button>
                    </Link>
                    
                      <Button
                        color="inherit"
                        variant="contained"
                        className={classes.btn1}
                        size="small"
                      >
                        Details
                      </Button>
                    
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <WorkDetails />

      {/* action buttons */}
      <Box mb={3} mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Button variant="contained" className={classes.btn2}>
              Ban User
            </Button>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Button variant="contained" className={classes.btn4}>
              Send Mail
            </Button>
          </Grid>
        </Grid>
      </Box>
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
  btn4: {
    backgroundColor: "#529C16",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#529C16" },
  },
  btn2: {
    backgroundColor: "#EF621C",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  btn3: {
    backgroundColor: "#000",
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
