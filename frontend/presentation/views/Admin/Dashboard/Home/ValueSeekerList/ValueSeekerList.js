import { Box, Container, Grid, Typography } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import FormInput from "../../../../../Components/Inputs/FormInput/FormInput";
import AdminLayout from "../../../../../Layout/AdminLayout";
import ProfileOption from "../../../../../parts/ProfileOption/ProfileOption";
import BasicTable from "./Table";

const ValueSeekerList = () => {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-between">
          <Typography variant="h6">
            Waiting Aproval List For Value Seeker
          </Typography>
          <ProfileOption />
        </Box>
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
              <FormInput type="number" placeholder="Task ID" bgc="#f8f8f8" />
            </Grid>
          </Grid>
        </Box>
        {/* tables */}
        <BasicTable />
      </Container>
    </AdminLayout>
  );
};

export default ValueSeekerList;
