import AdminLayout from "../../../../Layout/AdminLayout";
import {
  Container,
  makeStyles,
} from "@material-ui/core";
import JobAprovalList from "./JobAprovalList";

const JobAprovals = () => {
  const classes = useStyles();
  return (
    <AdminLayout>
      <Container>
        <JobAprovalList  />
      </Container>
    </AdminLayout>
  );
};

export default JobAprovals;

const useStyles = makeStyles({
  btn1: {
    backgroundColor: "#155475",
    borderRadius: "15px",
    color: "#fff",
    width: "80px",
    "&:hover": { backgroundColor: "#155475" },
    marginBottom: "1rem",
  },
});

