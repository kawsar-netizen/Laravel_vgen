import {
  Avatar,
  Box,
  Button,
  Container,
  Modal,
  Typography,
} from "@material-ui/core";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import { useState } from "react";
//ICONS
import CloseIcon from "@material-ui/icons/Close";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 600,
    backgroundColor: "#f5f5f5",
    padding: "1rem",
  },
  modalBody: {
    width: 400,
    margin: "2rem auto",
  },
  iconBox: {
    width: "50px",
    padding: "1rem",
    margin: "10px",
    textAlign: "center",
  },
  modalBottom: {
    backgroundColor: "#d9dcdf",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, "pending"),
  createData("Ice cream sandwich", 237, 9.0, 37, "pending"),
  createData("Eclair", 262, 16.0, 24, "pending"),
  createData("Cupcake", 305, 3.7, 67, "pending"),
  createData("Gingerbread", 356, 16.0, 49, "pending"),
];

const AddMoney = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Paper className={classes.modal}>
      <Box className="flex-end">
        <CloseIcon onClick={handleClose} fontSize="small" />{" "}
      </Box>
      <Paper className={classes.modalBody}>
        <Paper elevation={0} className="center">
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} className={classes.iconBox}>
              <Avatar>
                <ContactPhoneIcon fontSize="small" />
              </Avatar>
              <Typography align="center" variant="body2">
                Support
              </Typography>
            </Box>
          ))}
        </Paper>
        <Box className={classes.modalBottom}>
          <Button>Pay $100.00 </Button>
        </Box>
      </Paper>
    </Paper>
  );

  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography variant="h6" align="left">
          Add Money
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          Add money to your wallet that you'll pay to your client
        </Typography>
        {/* buttons */}
        <Box className="flex-end flex-column" mt={2}>
          <Link href="/valueseeker/dashboard/addmoney/create-payment-request-manual">
            <Button
              className="m-1"
              size="small"
              variant="contained"
              color="secondary"
            >
              Create payment request (Manual)
            </Button>
          </Link>

          <Button
            className="m-1"
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Instant Payment
          </Button>
        </Box>
        {/* table */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell align="left">Time</TableCell>
                <TableCell align="left">Method</TableCell>
                <TableCell align="left">TNX Id</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="left">{row.carbs}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="left">{row.protein}</TableCell>
                  <TableCell align="left">
                    {" "}
                    <Button variant="contained" color="primary" size="small">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Container>
    </Layout>
  );
};

export default AddMoney;
