import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import SearchIcon from "@material-ui/icons/Search";
import SelectInput from "../../../../Components/Inputs/Select/Select";
import CompletedTaskCard from "./CompletedTaskCard";
const Wallet = () => {
  return (
    <Layout>
      <Container>
        <Box style={{ maxWidth: "300px !important" }}>
          <FormInput
            type="text"
            bgc="#f2f2f2"
            placeholder="Search For Jobs"
            icon={<SearchIcon fontSize="small" />}
          />
        </Box>
        <Box mb={3} className="flex-between">
          <Typography gutterBottom variant="h6" align="left">
            My Wallet
          </Typography>
          <Box style={{ maxWidth: "300px" }}>
            <SelectInput />
          </Box>
        </Box>

        {/* cards */}
        <Grid container spacing={5}>
          {[1, 2, 3, 4].map((card) => (
            <Grid key={card} item xs={12} md={3}>
              <Card
                style={{
                  backgroundColor: "#e3ebff !important",
                  textAlign: "center !important",
                }}
              >
                <CardContent>
                  <Typography variant="h5">750 $</Typography>
                  <Typography gutterBottom variant="subtitle2">
                    Balance
                  </Typography>
                  <Button variant="contained" color="secondary" size="small">
                    12% +{" "}
                  </Button>
                  <Typography variant="body2">Growth This Month</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={3} mb={3} className="flex-end">
          <Button variant="contained" color="primary">
            View STatement
          </Button>
        </Box>
        <Typography variant="h6">Pending Details</Typography>
        {/* cards */}
        <CompletedTaskCard />
        <Typography variant="h6">Working On</Typography>
        <Box className="flex">
          <Card
            style={{
              backgroundColor: "#f3f6fc !important",
              textAlign: "center !important",
              marginRight: "1rem !important",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="subtitle2">
                Projects
              </Typography>
              <Typography variant="h5">3</Typography>
            </CardContent>
          </Card>
          <Card
            style={{
              backgroundColor: "#f3f6fc !important",
              textAlign: "center !important",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="subtitle2">
                Total Amount
              </Typography>
              <Typography variant="h5">520 $</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Layout>
  );
};

export default Wallet;
