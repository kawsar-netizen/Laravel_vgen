import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import PostedJobcard from "../../../../parts/PostedJobcard/PostedJobcard";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from "../../../../../context/UserContext";
import { sendData } from "../../../../../handler/apiHandler";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
const Bid = ({ bid }) => {
  const [getClientName, setGetClientName] = useContext(UserContext)
  // const [bidConfirmation, setBidConfirmation] = useContext(UserContext)
  const [appliedJob, setAppliedJob] = useState()
  const [message, setMessage] = useState('')
  // const router  = useRouter()

  const applyToJob = () =>{
    const userInfo = cookie.get('generatorUser')
    const clientMessage ={
      message: message
    }
    sendData(`/generator/job/apply/${bid?.jobId}`, userInfo, clientMessage).then(result =>{
      console.log(result)
      if(result.success){
        // setBidConfirmation(result?.apply)
        setAppliedJob(result?.apply)
        alert(result.message)
      }
    })
  }

  return (
    <Layout>
      <Container>
        <Box style={{ maxWidth: "300px !important" }}>
          <FormInput
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
            icon={<SearchIcon fontSize="small" />}
          />
        </Box>
        <TaskStatusCardsRow />
        <PostedJobcard  bid={bid} bidConfirmation={appliedJob}/>
        {/* text */}
       {!appliedJob?.title && <>
          <Box className="flex-between" mt={2} mb={2}>
            <Typography variant="h6">Placing Bid For This Job</Typography>
            <Typography variant="body2">
             Mentioning Your Related Job Experience Enhance   <br />{" "}
             The Possibility of Getting The Work
            </Typography>
          </Box>
          {/* textBox */}
          <Box
            style={{ backgroundColor: "#ececec", borderRadius: "5px" }}
            p={3}
            mb={2}
          >
            <Typography gutterBottom variant="subtitle1">
              To, <br /> {getClientName}
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write here..."
              className="mb-5"
              style={{ backgroundColor: "#fff", marginBottom: "1rem" }}
            />
            <Button variant="contained" color="secondary" onClick={applyToJob}>
              Send
            </Button>
          </Box>
        </>}
      </Container>
    </Layout>
  );
};

export default Bid;
