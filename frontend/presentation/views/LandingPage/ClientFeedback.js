import { Box, Container, Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Title from "../../Components/Title/Title";
const arr = [1, 2, 3, 4, 5, 6];
const ClientFeedback = () => {
  return (
    <Container>
      <Title text="Clients Feedback" />
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {arr.map((item) => (
          <Grid key={item} item xs={6} sm={4} lg={2}>
            <div
              style={{
                height: "180px",
                objectFit: "contain",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src="/assets/images/Images/client.jpg"
                height="100%"
                width="100%"
              />
            </div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={2} readOnly />
              <Typography align="center" variant="subtitle1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
                excepturi.
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientFeedback;
