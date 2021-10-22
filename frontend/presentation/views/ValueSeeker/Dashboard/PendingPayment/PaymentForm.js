import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import FormButton from "../../../../Components/Buttons/FormButton/FormButton";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import PendingPayCard from "./PendingPayCard";

const PaymentForm = () => {
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography variant="h6" align="left">
          Pending Payment
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          Value generator are waiting for payment
        </Typography>
        <PendingPayCard />
        <Box className="flex">
          <Typography variant="subtitle1">Short Of Money? </Typography>
          <Link href="/valueseeker/dashboard/addmoney">
            <Typography className="ml-5" color="primary" variant="subtitle1">
              Add Money
            </Typography>
          </Link>
        </Box>
        {/* FORM */}
        <Grid spacing={3} container>
          {/* FormLeft */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Amount</Typography>
            <FormInput bgc="#f2f2f2" type="text" />
            <Typography variant="subtitle1">Tip(if you want)</Typography>
            <FormInput bgc="#f2f2f2" type="text" />
            <Box mb={2} className="flex">
              <Checkbox fontSize="small" />
              <Typography variant="subtitle1">Partial Payment</Typography>
            </Box>
            <Typography variant="subtitle1">Input Reference ID</Typography>
            <FormInput bgc="#f2f2f2" type="text" />
          </Grid>
          {/* formright */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Comment</Typography>
            <TextField
              placeholder="Write something"
              multiline
              variant="filled"
              fullWidth
              rows={5}
            />
          </Grid>
        </Grid>
        <Box className="flex-end">
          <Button variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default PaymentForm;
