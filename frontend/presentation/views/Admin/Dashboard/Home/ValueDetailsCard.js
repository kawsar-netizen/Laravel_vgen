import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import styles from "./AdminDashboardHome.module.css";

const ValueDetailsCard = () => {
  return (
    <Card
      elevation={0}
      style={{
        backgroundColor: "#fff",
        border: "none",
        marginTop: "1rem",
      }}
    >
      <CardContent>
        <Box className="flex-between">
          <Box className={styles.valueDetailsCard__dollarBox}>
            <AttachMoneyIcon fontSize="large" />
          </Box>
          <Box className={styles.valueDetailsCard__info}>
            <Typography variant="body2">Attach Money</Typography>
            <Typography variant="h6">43,87,58265 TK</Typography>
            <Typography variant="body2">+ 2.00%</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ValueDetailsCard;
