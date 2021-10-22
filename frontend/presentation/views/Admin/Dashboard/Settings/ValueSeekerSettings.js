import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import CustomModal from "../../../../parts/Modal/Modal";
import { Add } from "@material-ui/icons";
import SelectInput from "../../../../Components/Inputs/Select/Select";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";

const ValueSeekerSettings = () => {
  const classes = useStyles();
  // checkbox
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.valueSeekerSettings}>
      <Box mb={4} className="flex">
        <Typography className="mr-5" variant="h6">
          Want More Field To Add?
        </Typography>
        <Button
          onClick={handleOpen}
          size="small"
          className={classes.btn1}
          variant="contained"
        >
          Add Field
          <Add fontSize="small" />
        </Button>
      </Box>
      <Box mb={2} className="flex">
        <Typography className="mr-5" variant="h6">
          Personal Information
        </Typography>
        <Button
          onClick={handleOpen}
          size="small"
          className={classes.btn1}
          variant="contained"
        >
          Add Field
          <Add fontSize="small" />
        </Button>
      </Box>
      {/* checkboxes */}
      <Grid spacing={3} container>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((items) => (
          <Grid item key={items} xs={12} md={4} lg={4}>
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
                label="FirstName"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mb={2} mt={4} className="flex">
        <Typography className="mr-5" variant="h6">
          Address
        </Typography>
        <Button
          onClick={handleOpen}
          size="small"
          className={classes.btn1}
          variant="contained"
        >
          Add Field
          <Add fontSize="small" />
        </Button>
      </Box>
      {/* checkboxes */}
      <Grid spacing={3} container>
        <Grid item xs={12} md={6} lg={6}>
          <Box mb={2} className={classes.checkCategory}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="default"
                />
              }
              label="Present Address"
            />
          </Box>

          {[1, 2, 3, 4].map((items) => (
            <Box key={items} className="center">
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
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box mb={2} className={classes.checkCategory}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="default"
                />
              }
              label="Permanent Adress"
            />
          </Box>
          {[1, 2, 3, 4].map((items) => (
            <Box key={items} className="center">
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
          ))}
        </Grid>
      </Grid>

      <Box mb={2} mt={4} className="flex">
        <Typography className="mr-5" variant="h6">
          Payment
        </Typography>
        <Button
          onClick={handleOpen}
          size="small"
          className={classes.btn1}
          variant="contained"
        >
          Add Field
          <Add fontSize="small" />
        </Button>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <Box mb={2} className={classes.checkCategory}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="default"
                />
              }
              label="Payment Methode"
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
              label="Bank Account"
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
              label="Mobile Banking"
            />
          </Box>
        </Grid>
      </Grid>
      {/* CustomModal */}
      <CustomModal open={open} handleClose={handleClose}>
        <Grid container spacing={3}>
          <Grid item  xs={12} md={6} lg={6}>
            <Typography variant="subtitle1">Feild Title</Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Typography variant="subtitle1">How many row?</Typography>
            <SelectInput />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="secondary"
                  />
                }
                label="Drop Down"
              />
            </Box>
            <Typography variant="subtitle1">How many row?</Typography>
            <SelectInput />
            <Typography variant="subtitle1">Row Heading</Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Typography variant="subtitle1">Row 01 Heading</Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Typography variant="subtitle1">Row 02 Heading</Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Button
              className={classes.btn2}
              onClick={handleOpen}
              variant="contained"
            >
              Add Feild
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </Box>
  );
};

export default ValueSeekerSettings;

const useStyles = makeStyles({
  valueSeekerSettings: {
    maxWidth: "650px",
  },
  btn1: {
    display: "flex",
    backgroundColor: "#155475",
    borderRadius: "15px",
    color: "#fff !important",
    width: "auto",
    "&:hover": { backgroundColor: "#155475" },
  },
  btn2: {
    display: "flex",
    backgroundColor: "#155475",
    borderRadius: "5px",
    color: "#fff !important",
    "&:hover": { backgroundColor: "#155475" },
    marginBottom: "1rem",
    width: "120px",
    marginLeft: "auto",
  },
  checkCategory: {
    padding: "0px 5px",
    backgroundColor: "#529C16",
    borderRadius: "5px",
    color: "#fff !important",
    fontSize: "18px !important ",
  },
});
