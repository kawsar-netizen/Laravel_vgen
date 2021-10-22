import React, { useContext } from "react";
import { Box, Container, Button, Typography } from "@material-ui/core";
import Modal from "react-modal";
import BIdConfirmation from "../../../Modal/BIdConfirmation";
import { UserContext } from "../../../../../context/UserContext";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import SearchIcon from "@material-ui/icons/Search";
import Layout from "../../../../Layout/Layout";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import PostedJobcard from "../../../../parts/PostedJobcard/PostedJobcard";

const BIdJobs = () => {
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
        <TaskStatusCardsRow />
        <div>
          <PostedJobcard />
        </div>
      </Container>
    </Layout>
  );
};

export default BIdJobs;
