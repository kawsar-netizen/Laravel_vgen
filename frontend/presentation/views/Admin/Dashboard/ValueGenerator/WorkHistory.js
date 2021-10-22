import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import { getData } from "../../../../../handler/apiHandler";
import { useStyles } from "../BaseStyles/BaseStyles";
import Pagination from "@material-ui/lab/Pagination";
import cookie from "js-cookie";
import WorkDetails from "../Reports/WorkDetails";
import NotFoundData from '../../../NotFoundData/NotFoundData'


export default function WorkHistory({ profile }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [workLists, setWorkLists] = useState([]);
  const [showWorkDetails, setShowWorkDetails] = useState(false);
  const [singleWorkDetails, setSingleWorkDetails] = useState()
  const [isEmpty, setIsEmpty] = useState([])

  const [token, setToken] = useState(null);

  console.log(singleWorkDetails)
  console.log(profile?.basicInformation?.generatorId);

  const loadWorkHistoryList = () => {
    const adminToken = cookie.get("adminUser");
    console.log(adminToken);
    getData(
      `/admin/generator-work-history/${profile?.basicInformation?.generatorId}?page=${page}`,
      adminToken
    ).then((result) => {
      let responseJSON = result;
      setWorkLists(responseJSON?.WorkHistory);
      setIsEmpty(responseJSON?.WorkHistory?.data);
    });
  };

  const dataLength = workLists?.total / workLists?.per_page
  const totalPage = Math.ceil(dataLength)

  useEffect(() => {
    const userToken = cookie.get("adminUser");
    setToken(userToken);
  }, []);

  const loadSingleWorkDetails = (id) => {
    getData(`/admin/generator-work-details/${id}`, token).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
      if (responseJSON.success) {
        setSingleWorkDetails(responseJSON)
        console.log("view details working");
      }
    });
  };

  const loadSingleInvoice = (id) => {
    getData(`/admin/generator-work-invoice/${id}`, token).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
      if (responseJSON.success) {
        console.log("single invoice is working");
      }
    });
  };

  console.log(workLists);
  useEffect(() => {
    loadWorkHistoryList();
  }, [page]);

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
            {workLists?.data?.map((work) => (
              <TableRow key={work.workId}>
                <TableCell align="left">
                  <Typography className={classes.regularData}>
                    {work.workId}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.regularData}>
                    {work?.SeekerFirstName?.concat(" " +work?.SeekerLastName)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.updateStatus}>
                    {work.Duration}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.regularData}>
                    {work.StartDate}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className={classes.updateStatus}>
                    {work.value} $
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box className="center">
                    <Box className={classes.activeDot} mr={1} />
                    <Typography className={classes.activeStatus}>
                      {work.status}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="center">
                    <Box className={classes.activeDot} mr={1} />
                    <Typography className={classes.activeStatus}>
                      {work.paymentStatus}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex-around w-100 ">
                    <Link href="/admin/invoice">
                      <Button
                        color="inherit"
                        variant="contained"
                        className={classes.btn6}
                        size="small"
                        onClick={() => loadSingleInvoice(work.workId)}
                      >
                        Invoice
                      </Button>
                    </Link>

                    <Button
                      color="inherit"
                      variant="contained"
                      className={classes.btn1}
                      size="small"
                      onClick={() => {
                        loadSingleWorkDetails(work.workId);
                        setShowWorkDetails(true);
                      }}
                    >
                      Details
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isEmpty?.length <=0 && <NotFoundData />}
        <div className="flex-end" style={{marginTop:100}}>
          <Pagination
            count={totalPage}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            page={page}
            // hideNextButton={true}
            // hidePrevButton={true}
          />
        </div>
      </TableContainer>

      <div style={{marginTop: 20}}>{showWorkDetails && <WorkDetails singleWorkDetails={singleWorkDetails}/>}</div>

      {/* action buttons */}
      {/* <Box mb={3} mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Button variant="contained" className={classes.btn5}>
              Ban User
            </Button>
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
}
