import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TodayIcon from "@material-ui/icons/Today";
import { useState, useEffect } from "react";
import { getData } from "../../../../../handler/apiHandler";
import { useStyles } from "../BaseStyles/BaseStyles";
import cookie from 'js-cookie'

const PostDetails = ({ job }) => {
  // console.log(job.title)

  const [statusUpdate, setStatusUpdate] = useState("");
  const classes = useStyles();

  const handleSingleJob = () => {
    getData(`/admin/job/${job.jobId}`, token).then((result) => {
      let responseJSON = result?.data;
      console.log(responseJSON);
      setStatusUpdate(responseJSON?.job?.status);
    });
  };

  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = JSON.parse(sessionStorage.getItem("adminUser"));
    setToken(userToken.token);
    handleSingleJob();
  }, []);

  const approveJob = (id) => {
    getData(`/admin/job-approve/${id}`, token).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
      if (responseJSON.success) {
        console.log("job approved");
        handleSingleJob();
      }
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Job Title</TableCell>
              <TableCell align="left">Job ID</TableCell>
              <TableCell align="left">Posted Date</TableCell>
              <TableCell align="left">Budget</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={job.jobId}>
              <TableCell align="left">
                <Typography className={classes.regularData}>
                  {job.userId}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.regularData}>
                  {job.name}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.regularData}>
                  {job.jobId}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.regularData}>
                  {job.postedDate}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography className={classes.updateStatus}>
                  {job.budget} $
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Box className="left">
                  {(job.status === "Active" || statusUpdate === "Active") && (
                    <div className={classes.activeStatusField}>
                      <div className={classes.activeDot} mr={1}></div>
                      <Typography className={classes.activeStatus}>
                        {statusUpdate ? statusUpdate : job.status}
                      </Typography>
                    </div>
                  )}
                  {job.status === "Not Active" && statusUpdate !== "Active" && (
                    <div className={classes.activeStatusField}>
                      <div className={classes.notActiveDot} mr={1}></div>
                      <Typography className={classes.notActiveStatus}>
                        {job.status}
                      </Typography>
                    </div>
                  )}
                </Box>
              </TableCell>
              <TableCell align="left">
                <Box className="left">
                  {job.status !== "Active" && statusUpdate !== "Active" && (
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
                  {(job.status === "Active" || statusUpdate === "Active") && (
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
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mb={2} mt={3}>
        <Typography variant="h6">Job Details</Typography>
        <Typography className={classes.marginAll} variant="body2">
          {job.jobDetail}
        </Typography>
        <Typography variant="h6">You can work from</Typography>
        <Typography className={classes.marginAll} variant="body2">
          {job.youCanWorkFrom}
        </Typography>
        <Typography variant="h6">Required Skills</Typography>
        <Box mb={5}>
          <Grid container spacing={3}>
            {job.skills.map((items) => (
              <Grid item key={items} xs={12} lg={3}>
                <Box className={classes.skills}>
                  <Typography align="center" variant="body2">
                    {items.skill}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography variant="h6">Other Skills</Typography>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <div className="flex" style={{ marginRight: 30 }}>
            <LocationOnIcon className={classes.commonColor} fontSize="small" />
            <Typography variant="subtitle2">{job.workFrom}</Typography>
          </div>
          <div className="flex">
            <AttachMoneyIcon className={classes.commonColor} fontSize="small" />
            <Typography variant="subtitle2">
              Budget: {job.budgetRange} $
            </Typography>
          </div>
        </div>
        <div className="flex">
          <TodayIcon className={classes.commonColor} fontSize="small" />
          <Typography variant="subtitle2">Time: {job.time}</Typography>
        </div>
      </Box>
    </>
  );
};

export default PostDetails;
