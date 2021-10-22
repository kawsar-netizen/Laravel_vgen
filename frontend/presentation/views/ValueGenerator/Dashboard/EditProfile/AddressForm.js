import { Grid, Typography, Box, Button, Checkbox } from "@material-ui/core";
import Dropdown from "../../../../Components/Dropdown";
import { useState, useEffect } from "react";
import { sendData, getData } from "../../../../../handler/apiHandler";
import styles from "./EditProfile.module.css";

const AddressForm = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [token, setToken] = useState(null);
  const [checkBoxValue, setCheckBoxVallue] = useState(false);
  const [addressInfo, setAddressInfo] = useState();
  const [presentAddress, setPresentAddress] = useState({
    present_division: "",
    present_district: "",
    present_post_code: "",
    present_village: "",
    present_holding_no: "",
    present_road_no: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    permanent_division: "",
    permanent_disctict: "",
    permanent_post_code: "",
    permanent_village: "",
    permanent_holding_no: "",
    permanent_road_no: "",
  });

  useEffect(() => {
    const userToken = JSON.parse(sessionStorage.getItem("generatorUser"));
    setToken(userToken.token);

    const generatorToken = userToken.token;

    loadInputData(`/generator/view-address`, generatorToken, setAddressInfo);
  }, []);

  const handleChange = (event, setState, state) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setCheckBoxVallue(!checkBoxValue);
    if (!checkBoxValue) {
      setPermanentAddress({});
      if(addressInfo?.is_same === "1"){
        setDisabled(!isDisabled)
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let addressEditData = {
      present_division: presentAddress.present_division || addressInfo?.present_division,
      present_district: presentAddress.present_district || addressInfo?.present_district,
      present_post_code: presentAddress.present_post_code || addressInfo?.present_post_code,
      present_village: presentAddress.present_village || addressInfo?.present_village,
      present_holding_no: presentAddress.present_holding_no || addressInfo?.present_holding_no,
      present_road_no: presentAddress.present_road_no || addressInfo?.present_road_no,
      is_same: checkBoxValue,
      permanent_division: permanentAddress.permanent_division || addressInfo?.permanent_division,
      permanent_disctict: permanentAddress.permanent_disctict || addressInfo?.permanent_disctict,
      permanent_post_code: permanentAddress.permanent_post_code || addressInfo?.permanent_post_code,
      permanent_village: permanentAddress.permanent_village || addressInfo?.permanent_village,
      permanent_holding_no: permanentAddress.permanent_holding_no || addressInfo?.permanent_holding_no,
      permanent_road_no: permanentAddress.permanent_road_no || addressInfo?.permanent_road_no,
    };

    console.log(addressEditData);
    sendData(`/generator/add-address`, token, addressEditData).then(
      (result) => {
        let responseJSON = result;
        if (responseJSON.success) {
          console.log(responseJSON);
          alert("Profile edited successfully");
        }
      }
    );
  };

  const loadInputData = (type, userToken, setState) => {
    getData(type, userToken).then((result) => {
      let responseJSON = result;
      setState(responseJSON.Address);
      console.log(responseJSON);
    });
  };

  return (
    <div>
      <Typography gutterBottom variant="subtitle2" style={{ marginBottom: 20 }}>
        Present Address
      </Typography>
      <Grid spacing={3} container>
        <Grid item xs={12} md={6}>
          <Dropdown
            data={[
              { value: "Chittagong", label: "Chittagong" },
              { value: "Sylhet", label: "Sylhet" },
              { value: "Khulna", label: "Khulna" },
              { value: "Rangpur", label: "Rangpur" },
              { value: "Rajshahi", label: "Rajshahi" },
              { value: "Barishal", label: "Barishal" },
              { value: "Dhaka", label: "Dhaka" },
            ]}
            placeholder="Division"
            name="present_division"
            value={
              presentAddress.present_division || addressInfo?.present_division
            }
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Dropdown
            data={[
              { value: "Chittagong", label: "Chittagong" },
              { value: "Cox Bazar", label: "Cox Bazar" },
              { value: "Bandarban", label: "Bandarban" },
              { value: "Rangamati", label: "Rangamati" },
              { value: "Khagrachari", label: "Khagrachari" },
              { value: "Gaibandha", label: "Gaibandha" },
              { value: "Comilla", label: "Comilla" },
            ]}
            placeholder="District"
            name="present_district"
            value={
              presentAddress.present_district || addressInfo?.present_district
            }
            onChange={() =>
              handleChange(event, setPresentAddress, presentAddress)
            }
          />
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <div className={styles.formInputField}>
            <input
              type="text"
              placeholder="Post Code"
              name="present_post_code"
              defaultValue={
                presentAddress.present_post_code ||
                addressInfo?.present_post_code
              }
              onChange={() =>
                handleChange(event, setPresentAddress, presentAddress)
              }
              className={styles.inputField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <div className={styles.formInputField}>
            <input
              type="text"
              placeholder="Village"
              name="present_village"
              defaultValue={
                presentAddress.present_village || addressInfo?.present_village
              }
              onChange={() =>
                handleChange(event, setPresentAddress, presentAddress)
              }
              className={styles.inputField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <div className={styles.formInputField}>
            <input
              type="text"
              placeholder="Holding No"
              name="present_holding_no"
              defaultValue={
                presentAddress.present_holding_no ||
                addressInfo?.present_holding_no
              }
              onChange={() =>
                handleChange(event, setPresentAddress, presentAddress)
              }
              className={styles.inputField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
          <div className={styles.formInputField}>
            <input
              type="text"
              placeholder="Road No"
              name="present_road_no"
              defaultValue={
                presentAddress.present_road_no || addressInfo?.present_road_no
              }
              onChange={() =>
                handleChange(event, setPresentAddress, presentAddress)
              }
              className={styles.inputField}
            />
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: 30 }}>
        <Typography gutterBottom variant="subtitle2">
          Permanent Address
        </Typography>
        <div style={{ marginBottom: 20 }}>
          <Checkbox
            checked={isDisabled}
            size="small"
            name="is_same"
            value={checkBoxValue}
            inputProps={{ "aria-label": "checkbox with small size" }}
            onChange={handleCheckboxChange}
            onClick={() => setDisabled(!isDisabled)}
          />
          <span>Same as present</span>
        </div>
        {!isDisabled && (
          <Grid spacing={3} container>
            <Grid item xs={12} md={6}>
              <Dropdown
                data={[
                  { value: "Chittagong", label: "Chittagong" },
                  { value: "Sylhet", label: "Sylhet" },
                  { value: "Khulna", label: "Khulna" },
                  { value: "Rangpur", label: "Rangpur" },
                  { value: "Rajshahi", label: "Rajshahi" },
                  { value: "Barishal", label: "Barishal" },
                  { value: "Dhaka", label: "Dhaka" },
                ]}
                placeholder="Division"
                name="permanent_division"
                value={
                  permanentAddress.permanent_division ||
                  addressInfo?.permanent_division
                }
                onChange={() =>
                  handleChange(event, setPermanentAddress, permanentAddress)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Dropdown
                data={[
                  { value: "Chittagong", label: "Chittagong" },
                  { value: "Cox Bazar", label: "Cox Bazar" },
                  { value: "Bandarban", label: "Bandarban" },
                  { value: "Rangamati", label: "Rangamati" },
                  { value: "Khagrachari", label: "Khagrachari" },
                  { value: "Gaibandha", label: "Gaibandha" },
                  { value: "Comilla", label: "Comilla" },
                ]}
                placeholder="District"
                name="permanent_disctict"
                value={
                  permanentAddress.permanent_disctict ||
                  addressInfo?.permanent_disctict
                }
                onChange={() =>
                  handleChange(event, setPermanentAddress, permanentAddress)
                }
              />
            </Grid>
            <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
              <div className={styles.formInputField}>
                <input
                  type="text"
                  placeholder="Post Code"
                  name="permanent_post_code"
                  defaultValue={
                    permanentAddress.permanent_post_code ||
                    addressInfo?.permanent_post_code
                  }
                  onChange={() =>
                    handleChange(event, setPermanentAddress, permanentAddress)
                  }
                  className={styles.inputField}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
              <div className={styles.formInputField}>
                <input
                  type="text"
                  placeholder="Village"
                  name="permanent_village"
                  defaultValue={
                    permanentAddress.permanent_village ||
                    addressInfo?.permanent_village
                  }
                  onChange={() =>
                    handleChange(event, setPermanentAddress, permanentAddress)
                  }
                  className={styles.inputField}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
              <div className={styles.formInputField}>
                <input
                  type="text"
                  placeholder="Holding No"
                  name="permanent_holding_no"
                  defaultValue={
                    permanentAddress.permanent_holding_no ||
                    addressInfo?.permanent_holding_no
                  }
                  onChange={() =>
                    handleChange(event, setPermanentAddress, permanentAddress)
                  }
                  className={styles.inputField}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} style={{ marginBottom: -20 }}>
              <div className={styles.formInputField}>
                <input
                  type="text"
                  placeholder="Road No"
                  name="permanent_road_no"
                  defaultValue={
                    permanentAddress.permanent_road_no ||
                    addressInfo?.permanent_road_no
                  }
                  onChange={() =>
                    handleChange(event, setPermanentAddress, permanentAddress)
                  }
                  className={styles.inputField}
                />
              </div>
            </Grid>
          </Grid>
        )}
      </div>
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
