// import React, { useEffect, useState } from "react";
import cookie from 'cookie'
import Postedjob from "../../../../../presentation/views/ValueSeeker/Dashboard/Home/Postedjob/PostedJob";
const PostedJobPage = ({singleJob}) => {

  console.log(singleJob)
  return <Postedjob job={singleJob}/>;
};

export default PostedJobPage;

export const getServerSideProps = async (context) => {
  const token = cookie.parse(context.req.headers.cookie);
  console.log(token.seekerUser)
  // console.log(token)
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${token.seekerUser}`,
    "Accept": "application/json",
  });
  const res = await fetch(`http://127.0.0.1:8000/api/seeker/pending/job/${context.params.id}/job-details`, {
    method: "GET",
    headers: headers,
  });
  const postView = await res.json();
  const singleResult = postView?.data?.jobDetails
  const singleJob = singleResult || null
  return {
    props: {
      singleJob,
    },
  };
};