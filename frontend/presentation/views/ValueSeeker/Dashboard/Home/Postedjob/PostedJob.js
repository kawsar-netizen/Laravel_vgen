import { Button, Container, Grid, Typography } from "@material-ui/core";
import StatusCard from "../../../../../Components/Cards/StatusCard/StatusCard";
import Layout from "../../../../../Layout/Layout";
import PostedJobcard from "../../../../../parts/PostedJobcard/PostedJobcard";
import TaskStatusCardsRow from "../../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TodayIcon from "@material-ui/icons/Today";
import styles from './PostedJob.module.css'

const Postedjob = ({ job }) => {

  console.log(job);
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TaskStatusCardsRow />
        </div>
        <div style={{ padding: "2rem" }}></div>
        <Typography gutterBottom variant="h6" align="left">
          Your Job Post
        </Typography>
        {/* postedjobcard */}
        <PostedJobcard key={job?.jobId} jobDetails={job}/>
        {/* job details */}
        <Typography gutterBottom variant="h6" align="left">
          Job Details
        </Typography>
        <Typography gutterBottom variant="body2">
          {job?.jobDetail}
        </Typography>
        <Typography gutterBottom variant="h6" align="left">
          You can work from
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          {job?.youCanWorkFrom}
        </Typography>

        <Typography gutterBottom variant="h6" align="left">
          Required Skills
        </Typography>
        <Grid spacing={3} container>
          {job?.skills?.map((item) => (
            <Grid key={item} item md={3} xs={6}>
              <Button fullWidth variant="contained" color="secondary">
                {item.skill ? item.skill : <>No Data</>}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography gutterBottom variant="h6" align="left" style={{marginTop:20}}>
          Other Deatils{" "}
        </Typography>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div className="flex" style={{ marginRight: 30 }}>
            <LocationOnIcon style={{color: 'orange', marginRight: 10}} fontSize="small" />
            <Typography variant="subtitle2">{job?.workFrom}</Typography>
          </div>
          <div className="flex">
            <AttachMoneyIcon style={{color: 'orange', marginRight: 10}} fontSize="small" />
            <Typography variant="subtitle2">
              Budget: {job?.budgetRange} $
            </Typography>
          </div>
        </div>
        <div className="flex">
          <TodayIcon style={{color: 'orange', marginRight: 10}} fontSize="small" />
          <Typography variant="subtitle2">Time: {job?.time}</Typography>
        </div>
      </Container>
    </Layout>
  );
};

export default Postedjob;
