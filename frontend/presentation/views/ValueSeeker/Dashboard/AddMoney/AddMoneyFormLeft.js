import { Box, FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";

const AddMoneyFormLeft = () => {
  return (
    <Box mt={2}>
      <Typography align="left" variant="subtitle1">
        Payment Type
      </Typography>
      <FormControl style={{ width: "100%" }} variant="filled">
        <InputLabel htmlFor="filled-age-native-simple">
          Select Payment Type
        </InputLabel>
        <Select
          native
          value={12}
          inputProps={{
            name: "age",
            id: "filled-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <Typography align="left" variant="subtitle1">
        Amount
      </Typography>
      <FormInput type="text" bgc="#f2f2f2" />
      <Typography align="left" variant="subtitle1">
        Service Charge
      </Typography>
      <FormInput type="text" bgc="#f2f2f2" />
      <Typography align="left" variant="subtitle1">
        Topup Amount
      </Typography>
      <FormInput type="text" bgc="#f2f2f2" />
    </Box>
  );
};

export default AddMoneyFormLeft;
