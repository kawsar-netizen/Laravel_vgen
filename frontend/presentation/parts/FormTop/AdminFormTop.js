import { Paper, Typography } from "@material-ui/core";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import FacebookIcon from "@material-ui/icons/Facebook";
import styles from "./FormTop.module.css";

const AdminFormTop = ({ text }) => {
  return (
    <div className={styles.formTop}>
      <Typography
        style={{ marginBottom: "10px", fontWeight: "500" }}
        variant="h4"
      >
        {text}
      </Typography>
    </div>
  );
};

export default AdminFormTop;
