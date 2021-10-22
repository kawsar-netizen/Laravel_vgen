import { useState, useEffect } from "react";
import { useStyles } from "../BaseStyles/BaseStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getData } from "../../../../../handler/apiHandler";
import cookie from 'js-cookie'
import Pagination from "@material-ui/lab/Pagination";
import JobTable from "./JobTable";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import NotFoundData from "../../../NotFoundData/NotFoundData"


export default function JobAprovalList() {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [jobLists, setJobLists] = useState([]);
  const [term, setTerm] = useState('')
  const [isEmpty, setIsEmpty] = useState('')

  const loadJobLists = () => {
    const adminToken = cookie.get("adminUser");
    console.log(adminToken);
    getData(`/admin/job-approval-waiting-list/${term}?page=${page}`, adminToken).then(
      (result) => {
        let responseJSON = result;
        setJobLists(responseJSON);
        setIsEmpty(responseJSON?.data)
      }
    );
  };

  const dataLength = jobLists?.meta?.total / jobLists?.meta?.per_page
  const totalPage = Math.ceil(dataLength) 

  useEffect(() => {
    loadJobLists();
  }, [page, term]);

  return (
    <>
      <DashboardHeader searchText={(text) => setTerm(text)} loadJobs={loadJobLists}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Job ID</TableCell>
              <TableCell align="center">Job Title</TableCell>
              <TableCell align="center">Posted Date</TableCell>
              <TableCell align="center">Budget</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobLists?.data?.map((job) => (
              <JobTable job={job} key={job.jobId} loadJobLists={loadJobLists} />
            ))}
          </TableBody>
        </Table>
        {isEmpty?.length <=0 && <NotFoundData />}
        <div style={{marginTop:100}}>
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
    </>
  );
}
