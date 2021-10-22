import AdminLayout from "../../../../Layout/AdminLayout";
import React from 'react'
import { Box, Container } from "@material-ui/core";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import PostDetails from "./PostDetails";

const Post = ({job}) => {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        <PostDetails key={job.jobId} job={job}/>
      </Container>
    </AdminLayout>
  );
};

export default Post;
