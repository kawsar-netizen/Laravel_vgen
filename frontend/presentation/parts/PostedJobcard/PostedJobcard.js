import { Card, Grid } from "@material-ui/core";
import PostedJobcardLeft from "./PostedJobcardLeft";
import PostedJobcardRight from "./PostedJobcardRight";
import { useContext } from 'react'
import { UserContext } from "../../../context/UserContext";

const PostedJobcard = ({ jobDetails, job, bid, bidConfirmation}) => {
  return (
    <Card style={{ margin: "2rem 0rem" }}>
      <Grid container>
        <Grid item xs={2}>
          <PostedJobcardLeft job={job} jobDetails={jobDetails} bid={bid} bidConfirmation={bidConfirmation}/>
        </Grid>
        <Grid item xs={10}>
          <PostedJobcardRight jobDetails={jobDetails} job={job} bid={bid} bidConfirmation={bidConfirmation}/>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostedJobcard;
