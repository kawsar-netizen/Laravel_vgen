import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./PendingSelection.module.css";
import Link from "next/link";
import { Box, Button } from "@material-ui/core";
import NotFoundData from "../../../NotFoundData/NotFoundData";
import { getData } from "../../../../../handler/apiHandler";
import { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import cookie from 'js-cookie'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function JobProposalTable({ pendingJob, setJobInfo }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [applicantJob, setApplicantJob] = useState([]);
  const [isEmpty, setIsEmpty] = useState([])

  const pendingJobList = () => {
    const token = cookie.get("seekerUser");
    getData(
      `/seeker/pending/job/${pendingJob}/applicant-details?page=${page}`,
      token
    ).then((result) => {
      let response = result;
      setApplicantJob(response?.data);
      setIsEmpty(response)
      setJobInfo(response?.data)
    });
  };

  useEffect(() => {
    pendingJobList();
  }, [page]);

  const dataLength = isEmpty?.meta?.total / isEmpty?.meta?.per_page
  const totalPage = Math.ceil(dataLength) 
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Apply Date</TableCell>
            <TableCell align="center">Total Project</TableCell>
            <TableCell align="center">Sent Message</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicantJob?.map((job, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {job?.serialNo}
              </TableCell>
              <TableCell align="center">{job?.name}</TableCell>
              <TableCell align="left">{job?.Applydate}</TableCell>
              <TableCell align="center">{job?.totalProjects}</TableCell>
              <TableCell align="left">{job?.message}</TableCell>
              <TableCell align="left">
                <Box className="flex">
                  <Link
                    href="/valueseeker/dashboard/pending-selection/valueseeker-profile/[id]"
                    as={`/valueseeker/dashboard/pending-selection/valueseeker-profile/${job?.applicantId}`}
                  >
                    <Button size="small"> View Profile</Button>
                  </Link>
                  <Link href="/chat">
                    <Button size="small">Chat</Button>
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {applicantJob?.length <= 0 && <NotFoundData />}
      <div className="flex-end" style={{marginTop:20}}>
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
  );
}
