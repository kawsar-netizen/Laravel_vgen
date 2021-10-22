import { Grid, Typography, Box, Button } from "@material-ui/core";
import Dropdown from "../../../../Components/Dropdown";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { useState, useEffect } from "react";
import { sendData } from "../../../../../handler/apiHandler";

const AddressForm = () => {
  const [token, setToken] = useState(null);
  const [presentAddress, setPresentAddress] = useState({
    present_division: "",
    present_district: "",
    present_post_code: "",
    present_village: "",
    present_holding_no: "",
    present_road_no: "",
  });

  useEffect(() => {
    const userToken = JSON.parse(sessionStorage.getItem("seekerUser"));
    setToken(userToken.token);
  }, []);

  const handleChange = (event, setState, state) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const editProfileData = {
      ...presentAddress
    };
    console.log(editProfileData);
    sendData(`/seeker/profile-address`, token, editProfileData).then(
      (result) => {
        let responseJSON = result;
        if (responseJSON.success) {
          console.log(responseJSON);
          alert("Profile edited successfully");
        }
      }
    );
  };
  return (
    <div>
      <Typography gutterBottom variant="subtitle2" style={{ marginBottom: 20 }}>
        Address
      </Typography>
      <Grid spacing={3} container>
        <Grid item xs={12} md={6}>
          <Dropdown
            data={[
              { value: 1, label: "Chittagong" },
              { value: 2, label: "Sylhet" },
              { value: 3, label: "Khulna" },
              { value: 4, label: "Rangpur" },
              { value: 5, label: "Rajshahi" },
              { value: 6, label: "Barishal" },
              { value: 7, label: "Dhaka" },
            ]}
            placeholder="Division"
            name="present_division"
            value={presentAddress.present_division}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Dropdown
            data={[
              { value: 1, label: "Chittagong" },
              { value: 2, label: "Cox Bazar" },
              { value: 3, label: "Bandarban" },
              { value: 4, label: "Rangamati" },
              { value: 5, label: "Khagrachari" },
              { value: 6, label: "Gaibandha" },
              { value: 7, label: "Comilla" },
            ]}
            placeholder="District"
            name="present_district"
            value={presentAddress.present_district}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <FormInput
            bgc="#f2f2f2"
            placeholder="Post Code"
            name="present_post_code"
            value={presentAddress.present_post_code}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <FormInput
            bgc="#f2f2f2"
            placeholder="Village"
            name="present_village"
            value={presentAddress.present_village}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <FormInput
            bgc="#f2f2f2"
            placeholder="Holding No"
            name="present_holding_no"
            value={presentAddress.present_holding_no}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <FormInput
            bgc="#f2f2f2"
            placeholder="Road No"
            name="present_road_no"
            value={presentAddress.present_road_no}
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
      </Grid>
      <Box mt={3} className="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFormSubmit}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};

export default AddressForm;
