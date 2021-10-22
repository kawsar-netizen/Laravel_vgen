import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import OngoingTaskCard from "../../../../parts/OngoingTaskCard/OngoingTaskCard";
import ModalCard from "./ModalCard";
import styles from "./PendingPayment.module.css";

const PendingPayCard = ({ pendingToCustomer }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Paper className={styles.modal}>
      <ModalCard close={handleClose} />
    </Paper>
  );
  return (
    <Card elevation={0} className={styles.pendingPayCard}>
      <CardContent>
        {/* first row */}
        <Grid container>
          <Grid item xs={6}>
            <Box className="flex-between">
              <Typography variant="subtitle1">
                Project UI & UX Design
              </Typography>
              <Button size="small" variant="outlined" color="primary">
                Contractual Work
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="flex-end">
              <Typography variant="subtitle2">1027125162</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box m={2}></Box>
        {/* second row */}
        <Grid item container>
          <Grid item xs={5}>
            <Box className="flex-between">
              <Button size="small" variant="contained" color="primary">
                Pending
              </Button>
              <Button size="small" variant="contained">
                35$ pending
              </Button>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box className="flex-end">
              {pendingToCustomer ? (
                <Button size="small" color="primary">
                  Waiting for approval
                </Button>
              ) : (
                <Button onClick={handleOpen} size="small" color="secondary">
                  Pay
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      {/* modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Card>
  );
};

export default PendingPayCard;
