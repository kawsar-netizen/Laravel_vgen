import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useState } from "react";
import FormInput from "../../../../Components/Inputs/FormInput/FormInput";
import CustomModal from "../../../../parts/Modal/Modal";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const Basic = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Typography gutterBottom variant="h6">
        Commission of Vgen 2%
      </Typography>
      <Button size="small" className={classes.btn1} variant="contained">
        Edit Commission
        <Edit fontSize="small" />
      </Button>
      <Box mb={2} mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3} item>
            <Box className="flex-between w-100" mb={2}>
              <Typography gutterBottom variant="h6">
                Banks
              </Typography>
              <Button
                onClick={handleOpen}
                size="small"
                className={classes.btn1}
                variant="contained"
              >
                Add
                <Add fontSize="small" />
              </Button>
            </Box>
            {[1, 2, 3].map((item) => (
              <Box key={item} className="flex-between w-100 " mb={1}>
                <Typography gutterBottom variant="subtitle1">
                  IFIC
                </Typography>
                <Box className="flex">
                  <Delete className="mr-5" fontSize="small" />
                  <Edit fontSize="small" />
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item />
          <Grid item xs={12} md={4} lg={3} item>
            <Box className="flex-between w-100" mb={2}>
              <Typography gutterBottom variant="h6">
                Mobile Banking
              </Typography>
              <Button
                onClick={handleOpen}
                size="small"
                className={classes.btn1}
                variant="contained"
              >
                Add
                <Add fontSize="small" />
              </Button>
            </Box>
            {[1, 2, 3].map((item) => (
              <Box key={item} className="flex-between w-100 " mb={1}>
                <Typography gutterBottom variant="subtitle1">
                  IFIC
                </Typography>
                <Box className="flex">
                  <Delete className="mr-5" fontSize="small" />
                  <Edit fontSize="small" />
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
      <CustomModal open={open} handleClose={handleClose}>
        <Grid container spacing={4}>
          <Grid xs={12} item md={6} lg={6}>
            <Typography variant="subtitle1">
              Mobile Banking Wallet Name
            </Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Typography variant="subtitle1">Wallet Number</Typography>
            <FormInput type="text" bgc="#f2f2f2" />
            <Typography variant="subtitle1">Wallet Type</Typography>
            <Box className={classes.accountType}>
              <Box className={classes.accountTypeItem}>
                <Typography variant="subtitle2">Personal</Typography>
              </Box>
              <Box className={classes.accountTypeItem}>
                <Typography variant="subtitle2">Agent</Typography>
              </Box>
              <Box className={classes.accountTypeItem}>
                <Typography variant="subtitle2">Merchant</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} item md={6} lg={6}>
            <Box className={classes.gridRight}>
              <Box className={classes.uploadLogo}>
                <Typography align="right" variant="subtitle1">
                  Upload Logo
                </Typography>
                <Box className={classes.uploadLogoBtn}>
                  <Typography variant="subtitle2">
                    <ArrowUpwardIcon fontSize="small" /> Click To Upload Logo
                  </Typography>
                </Box>
              </Box>

              <Button
                onClick={handleOpen}
                className={classes.btn2}
                variant="contained"
              >
                Add Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
};

export default Basic;

const useStyles = makeStyles({
  btn1: {
    display: "flex",
    backgroundColor: "#155475",
    borderRadius: "15px",
    color: "#fff !important",
    width: "auto",
    "&:hover": { backgroundColor: "#155475" },
    marginBottom: "1rem",
  },
  btn2: {
    backgroundColor: "#155475",
    borderRadius: "5px",
    color: "#fff !important",
    "&:hover": { backgroundColor: "#155475" },
    marginBottom: "1rem",
    width: "120px",
    marginLeft: "auto",
  },
  gridRight: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  uploadLogo: {
    alignSelf: "flex-start",
    width: "100%",
  },
  uploadLogoBtn: {
    backgroundColor: "green",
    borderRadius: "8px",
    padding: "5px",
    color: "#fff !important",
  },
  accountType: {
    backgroundColor: "green",
    borderRadius: "8px",
  },
  accountTypeItem: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    color: "#fff",
    padding: "10px",
  },
});
