import JobProposals from "../../../../../../presentation/views/ValueSeeker/Dashboard/PendingSelection/JobProposals";
// import cookie from 'cookie'
const JobProposalsPage = ({ queryParams }) => (
  <JobProposals pendingJob={queryParams} />
);

export default JobProposalsPage;

export const getServerSideProps = async (context) => {
  const queryParams = context.params.id
  return {
    props: {
      queryParams,
    },
  };
};
