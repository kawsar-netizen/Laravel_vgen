import { Typography, Container, Button, Grid } from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import JobProposalTable from "./JobProposalTable";
import { useState } from 'react'

const JobProposals = ({ pendingJob }) => {
  const [jobInfo, setJobInfo] = useState([])
  const singleJob = jobInfo.find(name => name.jobTitle)
  console.log(jobInfo)
  console.log(pendingJob)
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography gutterBottom variant="h6" align="left">
          Pending Selections
        </Typography>
        <Grid justifyContent="space-between" alignItems="center" container>
          <Grid item xs={12} md={8}>
            <div className="flex">
              <Typography gutterBottom variant="h5" align="left">
              Projects {singleJob?.jobTitle ? <strong style={{color: "#21A1F1"}}>{singleJob?.jobTitle}</strong> : <strong style={{color: "red"}}>No Data</strong>}
              </Typography>
              <Button
                className="ml-5"
                size="small"
                color="secondary"
                variant="outlined"
              >
                {singleJob?.jobType ? singleJob?.jobType : <>No Data</>}
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              icon={<FindInPageIcon fontSize="small" />}
              type="text"
              bgc="#f8f8f8"
            />
          </Grid>
        </Grid>
        {/* submitted proposal list */}
        <JobProposalTable pendingJob={pendingJob} setJobInfo={setJobInfo}/>
      </Container>
    </Layout>
  );
};

export default JobProposals;
