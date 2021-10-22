import { Container, Grid, Typography } from "@material-ui/core";
import Image from "next/image";

const Body2 = () => {
  return (
    <Container maxWidth="xl" style={{ position: "relative" }}>
      <Grid justifyContent="center" alignItems="center" container>
        <Grid item xs={12} sm={6}>
          <Image
            src="/assets/images/Illustrations/Illustration_1.svg"
            layout="responsive"
            height="300"
            width="300"
            alt="illustartion"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container maxWidth="sm">
            <Typography gutterBottom variant="h4">
              Why Vgen is the best option for you
            </Typography>
            <Typography style={{ color: "#106eb8" }} gutterBottom variant="h5">
              Good Options
            </Typography>
            <Typography gutterBottom variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              similique consectetur aut quasi magnam nobis provident nam
              molestiae eveniet, ut excepturi natus corporis dolor aspernatur
              assumenda tempora numquam cum! Voluptates.
            </Typography>
            <Typography style={{ color: "#106eb8" }} gutterBottom variant="h5">
              Best Services
            </Typography>
            <Typography gutterBottom variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              similique consectetur aut quasi magnam nobis provident.
            </Typography>
            <Typography style={{ color: "#106eb8" }} gutterBottom variant="h5">
              Payment
            </Typography>
            <Typography gutterBottom variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              similique consectetur aut quasi magnam nobis provident.
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <img
          height="300px"
          width="300px"
          src="/assets/images/Illustrations/Illustration 4.svg"
          alt="sdsd"
          style={{ zIndex: -1 }}
        />
      </div>
    </Container>
  );
};

export default Body2;
