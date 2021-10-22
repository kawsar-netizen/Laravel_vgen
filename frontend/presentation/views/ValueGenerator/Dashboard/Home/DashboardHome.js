import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Dropdown from "../../../../Components/Dropdown";
import Layout from "../../../../Layout/Layout";
import PostedJobcard from "../../../../parts/PostedJobcard/PostedJobcard";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import SearchIcon from "@material-ui/icons/Search";
import withAuth from "../../../../HOC/withAuth";
import { getData } from "../../../../../handler/apiHandler";
import { Pagination } from "@material-ui/lab";
import NotFoundData from '../../../NotFoundData/NotFoundData'
import cookie from 'js-cookie'

const DashboardHome = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchJobsList = () => {
    const userInfo = cookie.get('generatorUser')
    getData(`/generator/jobs/${search}?page=${page}`, userInfo).then((res) => {
      setJobs(res);
      console.log(res);
    });
  };

  const dataLength = jobs?.meta?.total / 10
  const totalPage = Math.ceil(dataLength)

  useEffect(() => {
    fetchJobsList();
    // getTotalProjects();
  }, [search, page]);

  return (
    <Layout>
      <Container>
        <h1>{user}</h1>
        <Box style={{ maxWidth: "200px !important" }}>
          <FormInput
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
            icon={<SearchIcon fontSize="small" />}
          />
        </Box>
        <TaskStatusCardsRow />
        <Box className="flex-between">
          <Box>
            <Typography variant="h6">New Jobs</Typography>
            <Typography variant="body2">
              Showing {jobs?.jobsCount} Jobs
            </Typography>
          </Box>
          <Box style={{ maxWidth: "300px" }}>
            <Dropdown
              data={[
                { value: "Beginnere", label: "Beginner" },
                { value: "Intermediate", label: "Intemediate" },
                { value: "Expert", label: "Expert" },
              ]}
              style={{ marginTop: 10, marginBottom: "1rem" }}
              placeholder="Sort by level"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
        {/* cards */}
        <Grid container spacing={3}>
          {jobs?.data?.map((card) => (
            <Grid key={card.id} item xs={12}>
              <PostedJobcard job={card} vscard />
            </Grid>
          ))}
        </Grid>
        {jobs?.data?.length <=0 && <NotFoundData />}
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
      </Container>
    </Layout>
  );
};

export default withAuth(DashboardHome);
