import { Container, Typography } from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import PendingPayCard from "./PendingPayCard";

const PendingPayment = () => {
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography variant="h6" align="left">
          Pending Payment
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          Value generator are waiting for payment
        </Typography>
        {[1, 2, 3].map((card) => (
          <PendingPayCard key={card} />
        ))}
        <Typography variant="h6" align="left">
          Pending To Customer
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          You have paid but customer yet to recieve
        </Typography>
        <PendingPayCard pendingToCustomer />
      </Container>
    </Layout>
  );
};

export default PendingPayment;
