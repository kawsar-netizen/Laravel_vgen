import { Box, Container } from "@material-ui/core";
import React from "react";
import AdminLayout from "../../../../Layout/AdminLayout";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import CustomTabs from "../../../../parts/Tabs/Tabs";
import Basic from "./Basic";
import ValueSeekerSettings from "./ValueSeekerSettings";

const Settings = () => {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        <CustomTabs
          label1="Basic"
          label2="Value Seeker"
          label3="Value  Generator"
          componentOne={<Basic />}
          componentTwo={<ValueSeekerSettings />}
          componentThree={<ValueSeekerSettings />}
        />
      </Container>
    </AdminLayout>
  );
};

export default Settings;
