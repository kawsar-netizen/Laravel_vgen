import { Container, Grid, Typography } from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import AddMoneyFormLeft from "./AddMoneyFormLeft";
import AddMoneyFormRight from "./AddMoneyFormRight";

const ManualPaymentReq = () => {
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography gutterBottom variant="h6" align="left">
          Create Payment Request
        </Typography>
        {/* forms */}
        <Grid spacing={3} container>
          <Grid item xs={12} md={6}>
            <AddMoneyFormLeft />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddMoneyFormRight />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ManualPaymentReq;
