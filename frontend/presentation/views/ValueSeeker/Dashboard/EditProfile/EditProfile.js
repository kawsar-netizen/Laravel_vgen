import { Container, Typography, Box } from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import CompleteProfileStatus from "./CompleteProfileStatus";
import SimpleTabs from "./VSProfileEdit";

const EditProfile = () => {
  return (
    <Layout>
      <Container>
        <Box className="flex-between">
          <TaskStatusCardsRow />
          <CompleteProfileStatus />
        </Box>
        {/* forms */}
        <SimpleTabs />
      </Container>
    </Layout>
  );
};

export default EditProfile;
