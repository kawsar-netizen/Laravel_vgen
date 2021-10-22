import { Container, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import Title from "../../Components/Title/Title";
//icons
import AppleIcon from "@material-ui/icons/Apple";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import HelpIcon from "@material-ui/icons/Help";

const links1 = ["Security", "How It Works", "Investor", "News"];
const links2 = [
  "Privacy And Policies",
  "Terms And Conditions",
  "Copywrite Policies",
  "Fees And Charges",
];
const Footer = () => {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <Container maxWidth="sm">
        <Grid spacing={3} container>
          <Grid item xs={12} sm={6} md={4}>
            <Title variant="2" text="Download" />
            <ul
              style={{
                color: "#fff !important",
                listStyle: "none",
                textDecoration: "none",
                margin: 0,
                padding: 0,
                maxWidth: "300px",
              }}
            >
              <li
                style={{
                  padding: "3px",
                  color: "lightgray !important",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  marginBottom: "5px",
                }}
                className="flex"
              >
                <AppleIcon fontSize="large" />
                <div style={{ marginLeft: "5px" }}>
                  <Typography variant="body2">Available on the</Typography>
                  <Typography variant="h6">App Store</Typography>
                </div>
              </li>
              <li
                style={{
                  padding: "3px",
                  color: "lightgray !important",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  marginBottom: "5px",
                }}
                className="flex"
              >
                <PlayArrowIcon fontSize="large" />
                <div style={{ marginLeft: "5px" }}>
                  <Typography variant="body2">Get it on</Typography>
                  <Typography variant="h6">Google Play</Typography>
                </div>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Title variant="2" text="About" />
            <ul
              style={{
                color: "#fff",
                listStyle: "none",
                textDecoration: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {links1.map((item, i) => (
                <li
                  style={{ paddingBottom: "5px", color: "lightgray" }}
                  key={i}
                >
                  <Link href="#">{item}</Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Title variant="2" text="Terms" />
            <ul
              style={{
                color: "#fff",
                listStyle: "none",
                textDecoration: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {links2.map((item, i) => (
                <li
                  style={{ paddingBottom: "5px", color: "lightgray" }}
                  key={i}
                >
                  <Link href="#">{item}</Link>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
      <div style={{ padding: "2rem" }}></div>
      <Container>
        <Grid justifyContent="space-between" alignItems="center" container>
          <span style={{ color: "#fff", textAlign:'center' }}>
            <Link href="/help-and-support">
              <div style={{ display: "inline-flex" }}>
                Help and Support?
                <HelpIcon fontSize="small" />
              </div>
            </Link>
            <br /> Copyright @ 2021 Vgen
          </span>
          <span style={{ display: "inline-flex", color: "#fff" }}>
            Follow us on : <FacebookIcon />
            <LinkedInIcon />
            <TwitterIcon />
          </span>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
