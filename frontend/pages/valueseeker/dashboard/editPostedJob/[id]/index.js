import CreateJobPost from "../../../../../presentation/views/ValueSeeker/Dashboard/Home/CreateJobPost/CreateJobPost";
import cookie from 'cookie'
const EditPostedJob = ({ editJobPost }) => <CreateJobPost editJobPost={editJobPost} />;

export default EditPostedJob;

export const getServerSideProps = async (context) => {
  const token = cookie.parse(context.req.headers.cookie);
  console.log(token.seekerUser);
  // console.log(token)
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token.seekerUser}`,
    Accept: "application/json",
  });
  const res = await fetch(
    `http://127.0.0.1:8000/api/seeker/job/${context.params.id}/edit`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const bidJob = await res.json();
  const singleResult = bidJob?.data?.job;
  console.log(singleResult);
  const editJobPost = singleResult || null;

  return {
    props: {
        editJobPost,
    },
  };
};
