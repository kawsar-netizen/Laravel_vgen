import { Container, Typography } from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import CompletedTaskCard from "./CompletedTaskCard";

const CompletedTask = () => {
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
        {/* cards */}
        {[1, 2, 3, 4].map((card) => (
          <CompletedTaskCard key={card} />
        ))}
      </Container>
    </Layout>
  );
};

export default CompletedTask;
