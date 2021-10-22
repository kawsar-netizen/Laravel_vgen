import { Typography, Container, Grid } from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import FormButton from "../../../../Components/Buttons/FormButton/FormButton";
import OngoingTaskCard from "../../../../parts/OngoingTaskCard/OngoingTaskCard";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import withAuth from "../../../../HOC/withAuth";

const DashboardHome = ({ user }) => {

  return (
    <Layout>
      <Container>
        {/* task status row */}
        <h1>{user}</h1>
        <div className="flex-between">
          <TaskStatusCardsRow />
          <div>
            <Typography
              gutterBottom
              style={{ color: "#9ccff6", fontWeight: "bold" }}
              variant="subtitle1"
            >
              Want Value Generator?
            </Typography>

            <FormButton
              link="/valueseeker/dashboard/create-job-post"
              icon={<ArrowRightAltIcon />}
              text="Post Now"
              style={{ backgroundColor: "#469c15 !important" }}
            />
          </div>
        </div>
        <div style={{ padding: "3rem" }}></div>
        {/* ongoing task  */}
        <Typography gutterBottom variant="h6" align="left">
          Ongoing Tasks
        </Typography>
        <Grid spacing={4} container>
          {[1, 2, 3, 4].map((item) => (
            <Grid key={item} item xs={12} md={6}>
              <OngoingTaskCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default withAuth(DashboardHome);
