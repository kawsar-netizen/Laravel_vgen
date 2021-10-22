import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Slider,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import Link from "next/link";
import styles from "./Wallet.module.css";

const ViewTask = () => {
  return (
    <Layout>
      <Container>
        {/* serachbar */}
        <Box style={{ maxWidth: "300px" }}>
          <FormInput
            icon={<SearchOutlined fontSize="small" />}
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
          />
        </Box>
        {/* sometext */}
        <Typography variant="subtitle1">Pending Payment</Typography>
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
          <Button variant="outlined" color="primary">
            Contract Job
          </Button>
          <Link href="/">
            <Typography className="ml-5" variant="body2" color="primary">
              View Job Details
            </Typography>
          </Link>
        </Box>

        {/* CARDS TIME */}
        <Grid container>
          <Grid item xs={12}>
            <Box mb={3} className="flex w-100">
              {[1, 2, 3, 4].map((card) => (
                <Card elevation={3} key={card} className={styles.timeCard}>
                  <Typography variant="h5">0</Typography>
                  <Typography variant="h5">Days</Typography>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
        {/* prgressbar */}
        <Grid spacing={4} container>
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

            {/* Checkbox */}
            <Box className="flex">
              <Checkbox fontSize="small" />
              <Typography variant="subtitle1">Task Completed</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Send File To Client</Typography>
            <FormInput type="file" />
            <TextField
              placeholder="Write comment..."
              variant="outlined"
              fullWidth
              multiline
              rows={5}
            />
            <Button className="m-1" variant="contained" color="secondary">
              Send
            </Button>
          </Grid>
        </Grid>
        <Box mt={1} className="flex-end">
          <Button variant="contained" color="primary">
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
