import { Box, Container, Typography } from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import CompletedTaskCard from "./CompletedTaskCard";
import SearchIcon from "@material-ui/icons/Search";
const CompletedTask = () => {
  return (
    <Layout>
      <Container>
        <Box style={{ maxWidth: "200px !important" }}>
          <FormInput
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
            icon={<SearchIcon fontSize="small" />}
          />
        </Box>
        <Typography gutterBottom variant="h6" align="left">
          Completed Task
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

// route http://localhost:3000/valuegenerator/dashboard/completed-task
