import {  Container, Grid } from "@material-ui/core";
import Layout from "../../../../../Layout/Layout";
import OngoingTaskCard from "../../../../../parts/OngoingTaskCard/OngoingTaskCard";
import OngoingTaskCardDetails from "../../../../../parts/OngoingTaskCardDetails/OngoingTaskCardDetails";
import TaskStatusCardsRow from "../../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";

const TaskDetails = () => {
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <OngoingTaskCardDetails />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {[1, 2].map((item) => (
                <Grid key={item} item xs={12}>
                  <OngoingTaskCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default TaskDetails;
