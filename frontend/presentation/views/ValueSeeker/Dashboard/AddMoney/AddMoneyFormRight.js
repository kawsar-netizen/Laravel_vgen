import { Box, Typography, Button } from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";

const AddMoneyFormRight = () => {
  return (
    <Box mt={2}>
      <Typography align="left" variant="subtitle1">
        Date
      </Typography>
      <FormInput type="date" bgc="#f2f2f2" />
      <Typography align="left" variant="subtitle1">
        Transfer Information
      </Typography>
      <FormInput type="file" bgc="#f2f2f2" />
      <Typography align="left" variant="subtitle1">
        Reference/ TNXID
      </Typography>
      <FormInput type="number" bgc="#f2f2f2" />
      <Box className="flex-end">
        <Button variant="contained" color="secondary">
          Submit Request
        </Button>
      </Box>
    </Box>
  );
};

export default AddMoneyFormRight;
