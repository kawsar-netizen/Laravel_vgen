import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import SingleTable from "./SingleTable";
import cookie from "js-cookie";
import { getData } from "../../../../../handler/apiHandler";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import NotFoundData from '../../../NotFoundData/NotFoundData'

export default function BasicTable() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [userLists, setUserLists] = useState([]);
  const [isEmpty, setIsEmpty] = useState([])

  const loadUserLists = () => {
    const adminToken = cookie.get("adminUser");
    console.log(adminToken);
    getData(`/admin/seeker-list?page=${page}`, adminToken).then((result) => {
      let responseJSON = result;
      setUserLists(responseJSON?.data);
      setIsEmpty(responseJSON?.data?.data)
    });
  };

  const dataLength = userLists?.total / userLists?.per_page;
  const totalPage = Math.ceil(dataLength);

  console.log(userLists);
  useEffect(() => {
    loadUserLists();
  }, [page]);

  return (
    <>
      <DashboardHeader />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Ongoing Projects</TableCell>

              <TableCell align="center">Profile Created</TableCell>
              <TableCell align="center">Total Value Generated</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Account Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userLists?.data?.map((userList) => (
              <SingleTable
                userList={userList}
                key={userList.id}
                loadUserLists={loadUserLists}
              />
            ))}
          </TableBody>
        </Table>
        {isEmpty?.length <=0 && <NotFoundData />}
        <div className="flex-end" style={{ marginTop: 100 }}>
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#F2F2F2",
  },
});
