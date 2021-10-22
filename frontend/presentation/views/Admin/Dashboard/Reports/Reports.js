import AdminLayout from "../../../../Layout/AdminLayout";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import BasicTable from "./Table";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { SearchOutlined } from "@material-ui/icons";

const Reports = () => {
  const classes = useStyles();
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        {/* search input feilds */}
        <Box mb={1}>
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
              <FormInput type="text" placeholder="Task ID" bgc="#f8f8f8" />
            </Grid>
          </Grid>
        </Box>

        <Typography gutterBottom variant="subtitle1">
          Showing Results
        </Typography>
        <Button size="small" className={classes.btn1} variant="contained">
          All
        </Button>
        <BasicTable />
      </Container>
    </AdminLayout>
  );
};

export default Reports;

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
