import AdminLayout from "../../../../Layout/AdminLayout";
import {
  Container
} from "@material-ui/core";
import BasicTable from "./Table";

const ValueSeeker = () => {
  return (
    <AdminLayout>
      <Container>
        <BasicTable />
      </Container>
    </AdminLayout>
  );
};

export default ValueSeeker;
