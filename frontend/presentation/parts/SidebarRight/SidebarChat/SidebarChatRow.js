import { Avatar, Box, Typography } from "@material-ui/core";

const SidebarChatRow = () => {
  return (
    <Box mt={2} mb={2} className="flex">
      <Avatar src="/assets/images/Images/client.jpg" />
      <Box className="w-100" ml={2}>
        <Typography variant="body1">Steven Smith</Typography>
        <Box className="w-100 flex-between">
          <Typography variant="body2">Lorem ipsum dolor sit</Typography>
          <Typography color="primary" variant="body2">
            23/02/2021
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarChatRow;
