import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { SearchOutlined } from "@material-ui/icons";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import { useState } from "react";

const DashboardHeader = ({ searchText, loadJobs }) => {
  const [text, setText] = useState('');
  const classes = useStyles();

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   searchText(text);
  // };
  return (
    <>
      <Box className="flex-end">
        <ProfileOption />
      </Box>
      <Box mb={1}>
        <Grid spacing={4} container>
          <Grid item>
            <FormInput
              icon={<SearchOutlined fontSize="small" />}
              type="text"
              placeholder="Search by any parameter"
              bgc="#f8f8f8"
              onChange={(e) => {
                setText(e.target.value);
                console.log(e.target.value)
                searchText(text);
              }}
            />
          </Grid>
          <Grid item>
            {/* <form onSubmit={onSubmit}> */}
            <FormInput
              type="text"
              placeholder="Name"
              bgc="#f8f8f8"
              onChange={(e) => {
                setText(e.target.value);
                searchText(text);
              }}
            />
            {/* </form> */}
          </Grid>
          <Grid item>
            <FormInput
              type="number"
              placeholder="User ID"
              bgc="#f8f8f8"
              onChange={(e) => {
                setText(Number(e.target.value));
                console.log(text)
                searchText(text);
              }}
            />
          </Grid>
          <Grid item>
            <FormInput
              type="number"
              placeholder="Task ID"
              bgc="#f8f8f8"
              onChange={(e) => {
                setText(Number(e.target.value));
                searchText(text);
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Typography gutterBottom variant="subtitle1">
        Showing Results
      </Typography>
      <Button
        size="small"
        className={classes.btn1}
        variant="contained"
        onClick={() => {
          loadJobs();
          setText(null);
        }}
      >
        All
      </Button>
    </>
  );
};

export default DashboardHeader;

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
