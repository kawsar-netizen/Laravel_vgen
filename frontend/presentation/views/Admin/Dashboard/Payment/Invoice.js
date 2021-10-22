import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const Invoice = () => {
  const classes = useStyles();

  return (
    <Box mt={4} className={classes.invoice}>
      <Container maxWidth="lg">
        <Box className="flex-between">
          <Box>
            <Typography variant="h6">Steven Smith</Typography>
            <Typography variant="subtitle1">~California , USA</Typography>
          </Box>
          <Box>
            <Typography variant="h6">Invoice</Typography>
            <Typography variant="h6">#1243557</Typography>
          </Box>
        </Box>

        <Box className={classes.line} mt={2} mb={2} />
        <Grid spacing={4} container>
          <Grid item xs={12} md={4} lg={4}>
            <Typography gutterBottom variant="h6">
              Bill From:
            </Typography>
            <Typography variant="h6">Steven Smith</Typography>
            <Typography variant="subtitle1">~California , USA</Typography>
            <Typography variant="body1">steven@gmail.com</Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Typography gutterBottom variant="h6">
              Bill To:
            </Typography>
            <Typography variant="h6">Vgen Corp</Typography>
            <Typography variant="subtitle1">Dhaka, Bangladesh</Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Typography gutterBottom variant="h6">
              Date: 01-01-2021
            </Typography>

            <Typography gutterBottom variant="subtitle1">
              Amount: 5425$
            </Typography>
            <Typography variant="subtitle1">Work ID: 2189269</Typography>
          </Grid>
        </Grid>
        <Box className={classes.line} mt={2} mb={2} />
      </Container>
    </Box>
  );
};

export default Invoice;

const useStyles = makeStyles({
  invoice: {
    height: "100vh",
  },
  line: {
    height: "3px",
    width: "100%",
    backgroundColor: "lightgrey",
  },
});
