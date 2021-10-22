import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Slider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import Link from "next/link";

const ViewTask = () => {
  return (
    <Layout>
      <Container>
        {/* serachbar */}
        <Box style={{ maxWidth: "200px !important" }}>
          <FormInput
            icon={<SearchOutlined fontSize="small" />}
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
          />
        </Box>
        {/* sometext */}
        <Box className="flex">
          <Typography variant="h6">Job Post</Typography>{" "}
          <Typography className="ml-5" variant="h6" color="primary">
            Graphics Designer
          </Typography>{" "}
        </Box>
        <Typography gutterBottom variant="body1">
          2835235213
        </Typography>
        <Box className="flex">
          <Button size="small" variant="outlined" color="default">
            Hourly Work
          </Button>
          <Link href="/">
            <Typography className="ml-5" variant="body2" color="primary">
              View Job Details
            </Typography>
          </Link>
        </Box>

        <Grid spacing={4} container>
          {/* prgressbar */}
          <Grid item xs={12} md={6}>
            <Typography align="left" variant="body2">
              Progress
            </Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              defaultValue={100}
            />

            <Typography align="right" variant="body2">
              100%
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Payment Status
            </Typography>
            <Button size="small" variant="contained" color="secondary">
              Pending
            </Button>
            <Typography gutterBottom variant="subtitle1">
              Reason
            </Typography>
            <Typography gutterBottom color="primary" variant="body1">
              Bank Delay
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Completion Date
            </Typography>
            <Typography gutterBottom color="primary" variant="body1">
              23/02/2021
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="flex-column center">
              <Typography align="left" gutterBottom variant="subtitle1">
                Shared Files
              </Typography>
              <Typography
                align="left"
                gutterBottom
                color="primary"
                variant="body1"
              >
                Logo.png <br />
                Sample2.png <br />
                Sample2.png <br />
                Instruction.png <br />
              </Typography>
              <Typography align="left" gutterBottom variant="subtitle1">
                Client Details
              </Typography>
              <Box className="flex">
                <Avatar src="/assets/images/Images/client.jpg" />
                <Box ml={2}>
                  <Typography gutterBottom variant="body2">
                    Steve Smith
                  </Typography>
                  <Typography variant="body2">USA</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={"auto"} className="flex-end">
          <Button size="small" variant="contained" color="primary">
            {"Save & Exit"}
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default ViewTask;

const PrettoSlider = withStyles({
  root: {
    color: "#ff8800",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

// route http://localhost:3000/valuegenerator/dashboard/completed-task/view-details
