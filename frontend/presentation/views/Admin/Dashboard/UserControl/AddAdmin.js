import AdminLayout from "../../../../Layout/AdminLayout";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { useState } from "react";

const AddAdmin = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <AdminLayout>
      <Box className={classes.addAdmin}>
        <Container>
          {/* Profile */}
          <Box className="flex-end">
            <ProfileOption />
          </Box>

          <Grid spacing={4} container>
            {/* inputs */}
            <Grid item xs={12} md={4} lg={4}>
              <Typography gutterBottom variant="h6">
                Add Role (Admin)
              </Typography>
              {/* inputs */}
              <Box p={2}>
                <FormInput type="text" label="Enter Name" bgc="#f2f2f2" />
                <FormInput type="text" label="Email" bgc="#f2f2f2" />
                <FormInput type="password" label="Password" bgc="#f2f2f2" />
                <FormInput type="number" label="Phone" bgc="#f2f2f2" />
              </Box>
            </Grid>
            {/* 2nd grid */}
            <Grid item xs={12} md={4} lg={3}>
              <Typography gutterBottom variant="h6">
                Control Access
              </Typography>
              {/* checkbox */}
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Dashboard"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action Buttons"
                />
              </Box>
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="User Control"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Add Manger"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Add Manger"
                />
              </Box>
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Value Generator"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="View Only"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action"
                />
              </Box>
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Value Seeker"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="View Only"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action"
                />
              </Box>
            </Grid>
            {/* line */}
            <Grid item xs={12} md={1} lg={2}>
              <Box className={classes.line} />
            </Grid>
            {/* end grid */}
            <Grid item xs={12} md={4} lg={3}>
              {/* checkbox */}
              <Box mb={4} />
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Value Generator"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="View Only"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action"
                />
              </Box>
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Job Aprovals"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="View Only"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action"
                />
              </Box>
              <Box className={classes.checkCategory}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="default"
                    />
                  }
                  label="Payment"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="View Only"
                />
              </Box>
              <Box className="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Action"
                />
              </Box>
            </Grid>
          </Grid>
          <Box className="flex-end">
            <Button variant="contained" className={classes.btn1}>
              Add Role
            </Button>
          </Box>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AddAdmin;

const useStyles = makeStyles({
  addAdmin: {
    backgroundColor: "#fff",
  },
  checkWrapper: {
    maxWidth: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  checkCategory: {
    padding: "0px 5px",
    backgroundColor: "#529C16",
    borderRadius: "5px",
    color: "#fff !important",
    fontSize: "18px !important ",
  },
  line: {
    height: "60vh",
    width: "2px",
    backgroundColor: "grey",
    display: "block",
    margin: "auto",
  },
  btn1: {
    backgroundColor: "#529C16",
    color: "#fff",
    width: "150px",
    "&:hover": { backgroundColor: "#529C16" },
  },
});
