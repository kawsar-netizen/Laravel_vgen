import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import OngoingTaskCard from "../../../../parts/OngoingTaskCard/OngoingTaskCard";
import SearchIcon from "@material-ui/icons/Search";

const OngoingTask = () => {
  return (
    <Layout>
      <Container>
        <Box style={{ maxWidth: "300px !important" }}>
          <FormInput
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
            icon={<SearchIcon fontSize="small" />}
          />
        </Box>
        <Typography gutterBottom variant="h6" align="left">
          Ongoing Task
        </Typography>
        <Grid spacing={4} container>
          {[1, 2, 3].map((item) => (
            <Grid key={item} item xs={12} md={6}>
              <OngoingTaskCard />
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <Typography gutterBottom variant="h6" align="left">
            Review Tasks
          </Typography>
        </Box>
        <Grid spacing={4} container>
          {[1].map((item) => (
            <Grid key={item} item xs={12} md={6}>
              <OngoingTaskCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default OngoingTask;
