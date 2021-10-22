// import React, { useEffect, useState } from "react";
import Post from "../../../../../../presentation/views/Admin/Dashboard/JobAprovals/Post";
import cookie from 'cookie'
const PostPage = ({singleJob}) => {

  console.log(singleJob)
  return <Post key={singleJob.jobId} job={singleJob}/>;
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const token = cookie.parse(context.req.headers.cookie);
  console.log(token.adminUser)
  // console.log(token)
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${token.adminUser}`,
    "Accept": "application/json",
  });
  const res = await fetch(`http://127.0.0.1:8000/api/admin/job/${context.params.id}`, {
    method: "GET",
    headers: headers,
  });
  const postView = await res.json();
  const singleResult = postView?.data?.job
  const singleJob = singleResult  ||  null

  return {
    props: {
      singleJob
    },
  };
};
