import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import AdminLayout from "../../../../Layout/AdminLayout";
import ProfileOption from "../../../../parts/ProfileOption/ProfileOption";
import AdminDashboardCard from "./AdminDashboardCard";
import AproveDetailsCard from "./AproveDetailsCard";
import LineChart from "./Chart";
import ValueDetailsCard from "./ValueDetailsCard";
import withAuth from '../../../../HOC/withAuth'

const AdminDashboardHome = () => {
  return (
    <AdminLayout>
      <Container>
        {/* Profile */}
        <Box className="flex-end">
          <ProfileOption />
        </Box>
        {/* Cards */}
        <Grid spacing={3} container>
          <AdminDashboardCard />
        </Grid>
        {/* $$$ value status cards */}
        <Grid spacing={3} container>
          {[1, 2, 3].map((card, i) => (
            <Grid key={i} item xs={12} md={3}>
              <ValueDetailsCard />
            </Grid>
          ))}
        </Grid>
        {/* charts */}
        <LineChart />
        {/* aprove value generator and seekers */}
        <Grid spacing={3} container>
          {[
            "/admin/dashboard/value-seeker-list",
            "/admin/dashboard/value-generator-list",
          ].map((link, i) => (
            <Grid key={i} item xs={12} md={3}>
              <AproveDetailsCard link={link} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default withAuth(AdminDashboardHome);
