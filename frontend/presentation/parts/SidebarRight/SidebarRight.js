import { Avatar, Typography, Box } from "@material-ui/core";
import styles from "./SidebarRight.module.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SidebarChat from "./SidebarChat/SidebarChat";

const SidebarRight = () => {
  return (
    <div className={styles.dashboard__sidebarRight}>
      {/* row1 */}
      <div className={styles.dashboard__sidebarRight_row1}>
        <select name="En" id="cars">
          <option value="volvo">En</option>
          <option value="saab">Bangla</option>
        </select>
        <NotificationsIcon fontSize="small" />
        <Typography variant="body2"> John Doe </Typography>
        <Avatar src="/assets/images/Images/client.jpg" />
      </div>
      <Box mt={5}>
        <Typography variant="h6">Recent Chat with client</Typography>
        <SidebarChat />
      </Box>
      <Typography variant="body1">SidebarRight Banner</Typography>
    </div>
  );
};

export default SidebarRight;
