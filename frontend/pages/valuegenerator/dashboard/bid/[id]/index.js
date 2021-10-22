import Bid from "../../../../../presentation/views/ValueGenerator/Dashboard/Home/Bid";
import cookie from 'cookie'
const BidPage = ({singleJobBid}) => <Bid bid={singleJobBid} />;

export default BidPage;

export const getServerSideProps = async (context) => {
  const token = cookie.parse(context.req.headers.cookie);
  console.log(token.generatorUser);
  // console.log(token)
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token.generatorUser}`,
    Accept: "application/json",
  });
  const res = await fetch(
    `http://127.0.0.1:8000/api/generator/bid-for-it/${context.params.id}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  const bidJob = await res.json();
  const singleResult = bidJob?.data?.job;
  console.log(singleResult)
  const singleJobBid = singleResult || null;

  return {
    props: {
        singleJobBid,
    },
  };
};
