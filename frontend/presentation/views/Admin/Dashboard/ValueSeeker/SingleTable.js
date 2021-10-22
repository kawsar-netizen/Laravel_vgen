import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
// import { Rating } from "@material-ui/lab";
import { useStyles } from "../BaseStyles/BaseStyles";
import cookie from "js-cookie";
import { getData } from "../../../../../handler/apiHandler";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Rating from "../Rating/Rating";

const SingleTable = ({ userList, loadUserLists }) => {
  const classes = useStyles();
  let first_name = userList.first_name;
  let last_name = userList.last_name;
  let fullName = first_name?.concat(" ",last_name);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const userToken = cookie.get("adminUser");
    setToken(userToken);
  }, []);

  const handleUser = (id) => {
    getData(`/admin/seeker-status/${id}`, token).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        loadUserLists();
        console.log(responseJSON);
        // alert(`${responseJSON.message}`);
      }
    });
  };
  return (
    <TableRow key={userList.id}>
      <TableCell align="left">
        <Typography className={classes.regularData}>{userList.id}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.regularData}>{fullName}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.updateStatus}>
          {userList.ongoingProject}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.regularData}>
          {userList.created_at}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.updateStatus}>
          {userList.balance} $
        </Typography>
      </TableCell>
      <TableCell align="center">
        {/* <StyledRating
          name="size-small"
          defaultValue={userList.rating}
          size="small"
        /> */}
        <Rating rating={userList.rating} />
      </TableCell>
      <TableCell align="center">
        <Box className="center">
          {userList.status_lable === "Active" && (
            <div className={classes.activeStatusField}>
              <div className={classes.activeDot} mr={1}></div>
              <Typography className={classes.activeStatus}>
                {userList.status_lable}
              </Typography>
            </div>
          )}
          {userList.status_lable === "Not Active" && (
            <div className={classes.activeStatusField}>
              <div className={classes.notActiveDot} mr={1}></div>
              <Typography className={classes.notActiveStatus}>
                {userList.status_lable}
              </Typography>
            </div>
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box className="flex w-100 ">
          {userList.status_lable === "Active" && (
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn3}
              size="small"
              onClick={() => handleUser(userList.id)}
            >
              Ban User
            </Button>
          )}
          {userList.status_lable !== "Active" && (
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn2}
              size="small"
              onClick={() => handleUser(userList.id)}
            >
              Active
            </Button>
          )}
          <Link
            href="/admin/dashboard/value-seeker/profileDetails/[id]"
            as={`/admin/dashboard/value-seeker/profileDetails/${userList.id}`}
          >
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn1}
              size="small"
            >
              View Info
            </Button>
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SingleTable;

// const StyledRating = withStyles({
//   iconFilled: {
//     color: "#000",
//   },
//   iconHover: {
//     color: "gold",
//   },
// })(Rating);
