import VSProfile from "../../../../../../presentation/views/ValueSeeker/Dashboard/PendingSelection/VSProfile";
import cookie from  'cookie'
const VSProfilePage = ({ singleProfile }) => <VSProfile singleProfile={singleProfile}/>;

export default VSProfilePage;

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
    `http://127.0.0.1:8000/api/generator/view-profile/${context.params.id}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const profileDetails = await res.json();
  const singleResult = profileDetails;
  console.log(singleResult);
  const singleProfile = singleResult || null;

  return {
    props: {
        singleProfile,
    },
  };
};
