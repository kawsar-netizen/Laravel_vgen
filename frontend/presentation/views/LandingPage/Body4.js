import { Container, Grid, Typography } from "@material-ui/core";
import Image from "next/image";
import Title from "../../Components/Title/Title";

const Body4 = () => {
  return (
    <Container>
      <Title text="Popular Professional Services" />
      <Grid justifyContent="center" alignItems="center" container spacing={3}>
        <Grid item xs={6} md={3}>
          <div className="center-column">
            <Image
              src="/assets/images/Icons/icons8-color-palette-96.svg"
              height="50px"
              width="50px"
              alt="logo"
            />
            <br />
            <Typography align="center" variant="subtitle1">
              Graphic Design
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="center-column">
            <Image
              src="/assets/images/Icons/icons8-color-palette-96.svg"
              height="50px"
              width="50px"
              alt="logo"
            />
            <br />
            <Typography align="center" variant="subtitle1">
              Graphic Design
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="center-column">
            <Image
              src="/assets/images/Icons/icons8-color-palette-96.svg"
              height="50px"
              width="50px"
              alt="logo"
            />
            <br />
            <Typography align="center" variant="subtitle1">
              Graphic Design
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid justifyContent="center" alignItems="center" container spacing={3}>
            <Grid item xs={6} md={3}>
              <div className="center-column">
                <Image
                  src="/assets/images/Icons/icons8-color-palette-96.svg"
                  height="50px"
                  width="50px"
                  alt="logo"
                />
                <br />
                <Typography align="center" variant="subtitle1">
                  Graphic Design
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className="center-column">
                <Image
                  src="/assets/images/Icons/icons8-color-palette-96.svg"
                  height="50px"
                  width="50px"
                  alt="logo"
                />
                <br />
                <Typography align="center" variant="subtitle1">
                  Graphic Design
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className="center-column">
                <Image
                  src="/assets/images/Icons/icons8-color-palette-96.svg"
                  height="50px"
                  width="50px"
                  alt="logo"
                />
                <br />
                <Typography align="center" variant="subtitle1">
                  Graphic Design
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className="center-column">
                <Image
                  src="/assets/images/Icons/icons8-color-palette-96.svg"
                  height="50px"
                  width="50px"
                  alt="logo"
                />
                <br />
                <Typography align="center" variant="subtitle1">
                  Graphic Design
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Body4;
