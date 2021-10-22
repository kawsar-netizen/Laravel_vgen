import { Box } from "@material-ui/core";
import SidebarChatRow from "./SidebarChatRow";

const SidebarChat = () => {
  return (
    <Box mb={3}>
      {[1, 2, 3, 4].map((chat) => (
        <SidebarChatRow key={chat} />
      ))}
    </Box>
  );
};

export default SidebarChat;
