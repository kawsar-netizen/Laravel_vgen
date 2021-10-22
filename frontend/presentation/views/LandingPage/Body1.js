import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Title from "../../Components/Title/Title";
import Image from "next/image";

const Body1 = () => {
  return (
    <div style={{ position: "relative" }}>
      {/* textbox */}
      <div style={{ textAlign: "center", padding: "3rem 1rem 5rem 1rem" }}>
        <Typography variant="h3">Loking For Value Generator?</Typography>
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <Typography variant="h6">You are at the right place</Typography>
          <CheckCircleIcon color="secondary" fontSize="small" />
        </span>
        <Typography
          style={{ maxWidth: "500px !important", margin: "0 auto" }}
          variant="subtitle2"
        >
          To get service you need to create an account. By creating an account
          youwil be abble to get the services that we will provide
        </Typography>
      </div>
      {/* illustration */}
      <Title text="Know About Users" />
      <div style={{ position: "absolute", bottom: "0px", left: "0px" }}>
        <img
          height="300px"
          width="300px"
          src="/assets/images/Illustrations/Illustration 4.svg"
          alt="sdsd"
        />
      </div>
      <Container style={{paddingTop:'2rem'}} maxWidth="sm">
        <Grid spacing={6} container>
          <Grid item xs={12} sm={6}>
            <Card style={{ minWidth: "255px", backgroundColor: "#e8e8e9" }}>
              <CardContent>
                <Image
                  src="/assets/images/Illustrations/Illustration_3.svg"
                  layout="responsive"
                  height="300"
                  width="300"
                  alt="illustartion"
                />
                <Typography
                  align="center"
                  style={{ color: "#106eb8" }}
                  variant="h6"
                >
                  Value Seeker
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card style={{ minWidth: "255px", backgroundColor: "#e8e8e9" }}>
              <CardContent>
                <Image
                  src="/assets/images/Illustrations/Illustration_2.svg"
                  layout="responsive"
                  height="300"
                  width="300"
                  alt="illustartion"
                />
                <Typography
                  align="center"
                  style={{ color: "#106eb8" }}
                  variant="h6"
                >
                  Value Generator
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Body1;
