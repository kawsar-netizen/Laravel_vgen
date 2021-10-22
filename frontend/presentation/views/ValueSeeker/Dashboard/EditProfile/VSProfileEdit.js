import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Grid } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ProfileForm from "./ProfileForm";
import PaymentMethodForm from "./PaymentMethodForm";
import AddressForm from "./AddressForm";
import OrganizationEdit from "./OrganizationEdit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      {/* tabs */}
      <Grid spacing={3} container>
        <Grid item xs={12} md={6}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="simple tabs example"
            >
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="Address" {...a11yProps(1)} />
              <Tab label="Payment" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
        </Grid>
        {value === 0 && (
          <Grid item xs={12} md={6}>
            <Box className="flex-end" mb={2}><small>If you are an organization, click here</small></Box>
            <Box className="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEnabled(!isEnabled)}
              >
                <PowerSettingsNewIcon
                  className="mr-1"
                  color="inherit"
                  fontSize="small"
                />
                Organization
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <TabPanel value={value} index={0}>
        {!isEnabled && <ProfileForm />}
        {isEnabled && <OrganizationEdit />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddressForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PaymentMethodForm />
      </TabPanel>
    </div>
  );
}
