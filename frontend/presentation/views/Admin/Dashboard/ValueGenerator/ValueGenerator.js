import AdminLayout from "../../../../Layout/AdminLayout";
import {
  Container
} from "@material-ui/core";
import BasicTable from "./Table";

const ValueGenerator = () => {
  return (
    <AdminLayout>
      <Container>
        <BasicTable />
      </Container>
    </AdminLayout>
  );
};

export default ValueGenerator;
