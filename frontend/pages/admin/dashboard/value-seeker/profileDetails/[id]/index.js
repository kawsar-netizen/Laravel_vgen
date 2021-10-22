import cookie from "cookie";
import ProfileDetails from "../../../../../../presentation/views/Admin/Dashboard/ValueSeeker/ProfileDetails";
const ProfilePage = ({ singleProfile }) => {
  console.log(singleProfile);
  return <ProfileDetails profile={singleProfile} />;
};

export default ProfilePage;

export const getServerSideProps = async (context) => {
  const token = cookie.parse(context.req.headers.cookie);
  console.log(token.adminUser);
  // console.log(token)
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token.adminUser}`,
    Accept: "application/json",
  });
  const res = await fetch(
    `http://127.0.0.1:8000/api/admin/seeker-information/${context.params.id}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const viewProfile = await res.json();
  const singleProfile = viewProfile?.SeekerAllInformation || null;

  return {
    props: {
      singleProfile
    },
  };
};
