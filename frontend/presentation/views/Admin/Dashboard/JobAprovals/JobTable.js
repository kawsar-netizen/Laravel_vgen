import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
import { getData } from "../../../../../handler/apiHandler";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useStyles } from "../BaseStyles/BaseStyles";
import cookie from "js-cookie";

const JobTable = ({ job, loadJobLists }) => {
  const classes = useStyles();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const userToken = cookie.get("adminUser");
    setToken(userToken);
  }, []);

  const approveJob = (id) => {
    getData(`/admin/job-approve/${id}`, token).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        loadJobLists();
        console.log(responseJSON);
      }
    });
  };
  return (
    <TableRow key={job.jobId}>
      <TableCell align="left">
        <Typography className={classes.regularData}>{job.userId}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.regularData}>{job.name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.regularData}>{job.jobId}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.regularData}>{job.jobTitle}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.updateStatus}>
          {job.postedDate}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography className={classes.updateStatus}>{job.budget}</Typography>
      </TableCell>
      <TableCell align="center">
        <Box className="center">
          {job.status === "Active" &&<div className={classes.activeStatusField}>
            <div className={classes.activeDot} mr={1}></div>
            <Typography className={classes.activeStatus}>
              {job.status}
            </Typography>
          </div>}
          {job.status === "Not Active" &&<div className={classes.activeStatusField}>
            <div className={classes.notActiveDot} mr={1}></div>
            <Typography className={classes.notActiveStatus}>
              {job.status}
            </Typography>
          </div>}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box className="center">
          {job.status !== "Active" && (
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn2}
              size="small"
              onClick={() => {
                approveJob(job.jobId);
              }}
            >
              Aprove
            </Button>
          )}
          {job.status === "Active" && (
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn3}
              size="small"
              onClick={() => {
                approveJob(job.jobId);
              }}
            >
              Disapprove
            </Button>
          )}
          <Link
            href={`/admin/dashboard/job-aprovals/post/[id]`}
            as={`/admin/dashboard/job-aprovals/post/${job.jobId}`}
          >
            <Button
              color="inherit"
              variant="contained"
              className={classes.btn1}
              size="small"
            >
              View Post
            </Button>
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default JobTable;

