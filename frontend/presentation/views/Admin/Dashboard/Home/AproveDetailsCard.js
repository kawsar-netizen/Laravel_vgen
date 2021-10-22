import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
// import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import styles from "./AdminDashboardHome.module.css";

import { useRouter } from "next/router";

const AproveDetailsCard = ({ link }) => {
  const router = useRouter();
  return (
    <Card className={styles.aproveDetailsCard}>
      <Box mb={3} className="flex-between">
        <Box>
          <Typography variant="h6" color="secondary">
            Value Generator
          </Typography>
          <Typography variant="body2">Aprove Request</Typography>
        </Box>
        <HourglassEmptyIcon fontSize="large" />
      </Box>
      <Box className="flex-between">
        <Typography variant="h6">155</Typography>
        <Box onClick={() => router.push(link)} className={styles.viewReqBtn}>
          View Request
        </Box>
      </Box>
    </Card>
  );
};

export default AproveDetailsCard;
