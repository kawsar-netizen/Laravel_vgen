import { Box, Button, Grid, Switch, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import Dropdown from "../../../../Components/Dropdown/index";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import { sendData, getData } from "../../../../../handler/apiHandler";
import cookie from "js-cookie";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./EditProfile.module.css";
const PaymentMethodForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    saveInfo: false,
  });
  const [values, setValues] = useState({
    bank_name: "",
    account_no: "",
    account_holder_name: "",
    branch_name: "",
    mobile_bank_type: "",
    account_no: "",
  });

  const [bankList, setBankList] = useState([]);
  const [mobileBankList, setMobileBankList] = useState([]);

  const getBankList = () => {
    const token = cookie.get("generatorUser");
    getData(`/generator/show-bank`, token).then((result) => {
      let response = result;
      setBankList(response?.BankName);
    });
  };

  const getMobileBankList = () => {
    const token = cookie.get("generatorUser");
    getData(`/generator/show-mobile-bank`, token).then((result) => {
      let response = result;
      setMobileBankList(response?.BankName);
    });
  };

  const deleteBankDetails = (id) => {
    const token = cookie.get("generatorUser");
    getData(`/generator/remove-bank/${id}`, token).then((res) => {
      let response = res;
      if (response) {
        getBankList();
      }
    });
  };

  const deleteMobileBankDetails = (id) => {
    const token = cookie.get("generatorUser");
    getData(`/generator/remove-mobile-bank/${id}`, token).then((res) => {
      let response = res;
      if (response) {
        getMobileBankList();
      }
    });
  };

  useEffect(() => {
    getBankList();
    getMobileBankList();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = cookie.get("generatorUser");
    const editProfileData = {
      bank_status: state.checkedA,
      mobile_banking_status: state.checkedB,
      ...values,
    };
    console.log(editProfileData);
    sendData(`/generator/add-bank`, token, editProfileData).then((result) => {
      let responseJSON = result;
      if (responseJSON.Bank) {
        console.log(responseJSON);
        setIsLoading(false);
        alert("Payment method updated successfully");
        getBankList();
        setErrorMessage("");
        setValues({});
      }
      if (!responseJSON.Bank) {
        setErrorMessage("The Bank Name Has Already Been Taken");
        setIsLoading(false);
      }
    });
  };

  const handleMobileBankSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = cookie.get("generatorUser");
    const editProfileData = {
      bank_status: state.checkedA,
      mobile_banking_status: state.checkedB,
      ...values,
    };
    console.log(editProfileData);
    sendData(`/generator/add-mobile-bank`, token, editProfileData).then(
      (result) => {
        let responseJSON = result;
        if (responseJSON.Bank) {
          console.log(responseJSON);
          setIsLoading(false);
          alert("Payment method updated successfully");
          getMobileBankList();
          setErrorMessage("");
          setValues({});
        }
        if (!responseJSON.Bank) {
          setErrorMessage("The Bank Name Has Already Been Taken");
          setIsLoading(false);
        }
      }
    );
  };
  console.log(bankList);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleValueInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // const saveInfo = () => {
  //   setState({ ...state, saveInfo: true, checkedA: false });
  // };

  return (
    <>
      <Typography variant="h6">Choose Payment Method</Typography>
      <Box className="flex">
        <Typography className="mr-5" variant="body1">
          Bank Account
        </Typography>
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          disabled={state.checkedB}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Box>
      <Box mb={3} className="flex">
        <Typography className="mr-5" variant="body1">
          Mobile Banking
        </Typography>
        <Switch
          checked={state.checkedB}
          onChange={handleChange}
          disabled={state.checkedA}
          name="checkedB"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Box>
      {/* account info */}
      {state.checkedA && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Bank name</Typography>
              <Dropdown
                data={[
                  { value: "Brac Bank", label: "Brac Bank" },
                  { value: "Dutch Bangla Bank", label: "Dutch Bangla Bank" },
                  { value: "IFIC Bank", label: "IFIC Bank" },
                  { value: "UCB", label: "UCB" },
                ]}
                // value={values.nationality}
                placeholder="Select bank"
                value={values.bank_name}
                onChange={handleValueInput}
                name="bank_name"
                // onChange={handleChange}
              />
              <p style={{ color: "red" }}>{errorMessage}</p>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                type="text"
                placeholder="Account Number"
                label="Account Number"
                value={values.account_no}
                onChange={handleValueInput}
                name="account_no"
                bgc="#f2f2f2"
                // value={values.nid_number}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput
                type="text"
                placeholder="Account holder name"
                label="Account holder name"
                bgc="#f2f2f2"
                value={values.account_holder_name}
                onChange={handleValueInput}
                name="account_holder_name"
                // value={values.nid_number}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Branch name</Typography>
              <Dropdown
                data={[
                  { value: "Kulgaon, Dhaka", label: "Kulgaon, Dhaka" },
                  {
                    value: "Khulshi, Chittagong",
                    label: "Khulshi, Chittagong",
                  },
                  { value: "Banani, Dhaka", label: "Banani, Dhaka" },
                  {
                    value: "Agrabad, Chittagong",
                    label: "Agrabad, Chittagong",
                  },
                ]}
                // value={values.nationality}
                placeholder="Select branch"
                name="branch_name"
                value={values.branch_name}
                onChange={handleValueInput}
              />
            </Grid>
          </Grid>
          <Box mt={2} className="flex-end">
            {/* <Button
              onClick={() => {
                saveInfo(), handleFormSubmit(event);
              }}
              variant="contained"
              color="secondary"
            >
              Save
            </Button> */}
            {!isLoading ? (
              <button className={styles.buttonStyle} onClick={handleFormSubmit}>
                Save
              </button>
            ) : (
              <button
                className={styles.buttonStyle2}
                // ref={editButton}
              >
                saving...
              </button>
            )}
          </Box>
        </>
      )}
      {state.checkedB && (
        <>
          <Grid item xs={12} md={6} style={{ marginBottom: 20 }}>
            <Typography variant="subtitle1">Mobile banking type</Typography>
            <Dropdown
              data={[
                { value: "Bkash", label: "Bkash" },
                { value: "Nagad", label: "Nagad" },
                { value: "IPay", label: "IPay" },
                { value: "UPay", label: "UPay" },
              ]}
              // value={values.nationality}
              placeholder="Choose mobile banking"
              value={values.mobile_bank_type}
              onChange={handleValueInput}
              name="mobile_bank_type"
              // onChange={handleChange}
            />
            <p style={{ color: "red" }}>{errorMessage}</p>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              type="text"
              placeholder="Input number"
              label="Input number"
              value={values.account_no}
              onChange={handleValueInput}
              name="account_no"
              bgc="#f2f2f2"
            />
          </Grid>
          <Box mt={2} className="flex-end">
            {!isLoading ? (
              <button className={styles.buttonStyle} onClick={handleMobileBankSubmit}>
                Save
              </button>
            ) : (
              <button
                className={styles.buttonStyle2}
                // ref={editButton}
              >
                saving...
              </button>
            )}
          </Box>
        </>
      )}
      {state.checkedA ? (
        <div style={{ marginTop: 50 }}>
          {bankList?.map((bank) => (
            <div
              style={{
                marginBottom: 30,
                borderBottom: "1px solid lightgray",
              }}
            >
              <Grid container spacing={3} key={bank.id}>
                <Grid container item xs={12}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Bank Name</Typography>
                    <Typography variant="body2">{bank.bank_name}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                      Account Holder Name
                    </Typography>
                    <Typography variant="body2">
                      {bank.account_holder_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Account Number</Typography>
                  <Typography variant="body2">{bank.account_no}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Branch Name</Typography>
                  <Typography variant="body2">{bank.branch_name}</Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: 20,
                }}
              >
                <DeleteIcon
                  className={styles.actionButtons}
                  onClick={() => {
                    deleteBankDetails(bank.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {state.checkedB ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Your saved payment method
            </Typography>
            <p style={{ color: "red" }}>
              You can change your payment method 1 time per month
            </p>
            {mobileBankList?.map((mobile) => (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom:20, alignItems:"center" }}>
                <img src="" alt="" />
                <strong style={{ marginRight: 20 }}>
                  {mobile.mobile_bank_type}
                </strong>
                <small>{mobile.account_no}</small>
                <div style={{ marginLeft: 20 }}>
                  <DeleteIcon
                    className={styles.actionButtons}
                    onClick={() => {
                      deleteMobileBankDetails(mobile.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default PaymentMethodForm;
