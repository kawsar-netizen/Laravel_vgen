import { Container, Grid, Typography } from "@material-ui/core";
import SignupInput from "../../Components/Inputs/Input/Input";
import Title from "../../Components/Title/Title";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormButton from "../../Components/Buttons/FormButton/FormButton";

const ContactUs = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title text="Get In Touch With Us" />
      <Typography
        align="center"
        style={{ fontWeight: "bold", maxWidth: "400px", margin: "0 auto" }}
        variant="subtitle2"
      >
        Have an inquery or feedback for us? <br />
        Fill out the form below to contact our team
      </Typography>
      <Container maxWidth="sm">
        <form style={{ margin: "2rem auto 2rem auto" }}>
          <Grid
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
          >
            <Grid item xs={12} sm={6}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="First name"
                label="First name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="First name"
                label="First name"
              />
            </Grid>
            <Grid item xs={12}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="First name"
                label="First name"
              />
            </Grid>
            <Grid item xs={12}>
              <SignupInput
                icon={<CheckCircleIcon fontSize="small" />}
                type="text"
                placeholder="First name"
                label="First name"
              />
            </Grid>
          </Grid>
        </form>
        <FormButton text="Submit" />
      </Container>
    </div>
  );
};

export default ContactUs;
