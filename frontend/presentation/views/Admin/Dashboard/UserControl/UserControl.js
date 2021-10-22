import AdminLayout from "../../../../Layout/AdminLayout";
import { Box, Container, Grid } from "@material-ui/core";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import BasicTable from "./Table";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { SearchOutlined } from "@material-ui/icons";
import UserControlCards from "./UserControlCards";
import SelectInput from "../../../../Components/Inputs/Select/Select";

const UserControl = () => {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        {/* cards */}
        <Grid spacing={3} container>
          <UserControlCards />
        </Grid>
        {/* search input feilds */}
        <Box mb={4} mt={3}>
          <Grid spacing={4} container>
            <Grid item>
              <FormInput
                icon={<SearchOutlined fontSize="small" />}
                type="text"
                placeholder="Search by any parameter"
                bgc="#f8f8f8"
              />
            </Grid>
            <Grid item>
              <FormInput type="number" placeholder="Name" bgc="#f8f8f8" />
            </Grid>
            <Grid item>
              <FormInput type="text" placeholder="User ID" bgc="#f8f8f8" />
            </Grid>
            <Grid item>
              <SelectInput />
            </Grid>
          </Grid>
        </Box>
        {/* tables */}
        <BasicTable />
      </Container>
    </AdminLayout>
  );
};

export default UserControl;
