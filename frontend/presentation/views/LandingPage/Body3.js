import { Container, Grid } from "@material-ui/core";
import Title from "../../Components/Title/Title";
import Image from 'next/image'
const Body3 = () => {
  return (
    <Container>
      <Title text="Our Top Clients" />
      <div style={{padding:'2rem'}} ></div>
      <Grid justifyContent="center" alignItems="center" spacing={3} container>
        <Grid item xs={6} md={3} >
          <Image
            src="/assets/images/Icons/vgenlogo.png"
            height="100px"
            width="200px"
            alt="logo"
          />
        </Grid>
        <Grid item xs={6} md={3} >
          <Image
            src="/assets/images/Icons/vgenlogo.png"
            height="100px"
            width="200px"
            alt="logo"
          />
        </Grid>
        <Grid item xs={6} md={3} >
          <Image
            src="/assets/images/Icons/vgenlogo.png"
            height="100px"
            width="200px"
            alt="logo"
          />
        </Grid>
        <Grid item xs={6} md={3} >
          <Image
            src="/assets/images/Icons/vgenlogo.png"
            height="100px"
            width="200px"
            alt="logo"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Body3;
