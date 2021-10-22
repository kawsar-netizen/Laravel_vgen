import cookie from "cookie";
import ProfileDetails from "../../../../../../presentation/views/Admin/Dashboard/ValueGenerator/ProfileDetails";
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
    `http://127.0.0.1:8000/api/admin/generator-information/${context.params.id}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const viewProfile = await res.json();
  const singleProfile = viewProfile?.GeneratorAllInformation || null;

  // const resHistory = await fetch(
  //   `http://127.0.0.1:8000/api/admin/generator-work-history/${context.params.id}`,
  //   {
  //     method: "GET",
  //     headers: headers,
  //   }
  // );
  // const workHistory = await resHistory.json();
  // const singleHistory = workHistory?.WorkHistory?.data || null;
  return {
    props: {
      singleProfile
    },
  };
};
