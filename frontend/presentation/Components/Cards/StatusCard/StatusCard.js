import { Card, Typography } from "@material-ui/core";
import styles from "./StatusCard.module.css";

const StatusCard = ({ text, number, bgc }) => {
  return (
    <Card
      style={{ backgroundColor: bgc ? bgc : "#000" }}
      className={styles.taskStatusCard}
    >
      <Typography variant="body2">{text}</Typography>
      <Typography variant="h5">{number}</Typography>
    </Card>
  );
};

export default StatusCard;
