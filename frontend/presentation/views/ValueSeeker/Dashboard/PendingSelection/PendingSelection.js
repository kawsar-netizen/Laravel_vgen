import { Typography, Grid, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import Layout from "../../../../Layout/Layout";
import OngoingTaskCard from "../../../../parts/OngoingTaskCard/OngoingTaskCard";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import cookie from 'js-cookie'

import { getData } from '../../../../../handler/apiHandler'

const PendingSelection = () => {
  const [jobs, setJobs] = useState([]);

  const loadData = () => {
    const userInfo = cookie.get('seekerUser')
    getData(`/seeker/pending/jobs`, userInfo).then(result => {
      let response = result
      setJobs(response?.data?.jobs);
  });
}
console.log(jobs)
useEffect(() => {
  loadData();
}, []);

  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        {/* ongoing task  */}
        <Typography gutterBottom variant="h6" align="left">
          Pending Selections
        </Typography>
        <Grid spacing={4} container>
          {jobs.map((item) => (
            <Grid key={item.id} item xs={12} md={6}>
              <OngoingTaskCard jobs={item} type="pending" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default PendingSelection;
