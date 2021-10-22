import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import { Box, Container } from "@material-ui/core";
import AdminLayout from "../../../../Layout/AdminLayout";
import ProfileInfo from "./ProfileInfo";
import WorkHistory from "./WorkHistory";
import CustomTabs from "../../../../parts/Tabs/Tabs";

export default function ProfileDetails({ profile }) {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        <CustomTabs
          label1="Profile Information"
          label2="Work History"
          componentOne={<ProfileInfo profile={profile}/>}
          componentTwo={<WorkHistory profile={profile}/>}
        />
      </Container>
    </AdminLayout>
  );
}
