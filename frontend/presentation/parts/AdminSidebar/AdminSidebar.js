import styles from "./AdminSidebar.module.css";
import Link from "next/link";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkIcon from "@material-ui/icons/Work";
import PaymentIcon from "@material-ui/icons/Payment";
import WarningIcon from "@material-ui/icons/Warning";
import SettingsIcon from "@material-ui/icons/Settings";
import LogOutButton from '../../Components/LogOutButton/LogOutButton'

const adminNavs = [
  {
    logo: <DashboardIcon className="mr-5 " />,
    text: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    logo: <RecentActorsIcon className="mr-5" />,
    text: "User Controle",
    link: "/admin/dashboard/user-control",
  },
  {
    logo: <PersonIcon className="mr-5" />,
    text: "Value Generator",
    link: "/admin/dashboard/value-generator",
  },
  {
    logo: <PersonOutlineIcon className="mr-5" />,
    text: "Value Seeker",
    link: "/admin/dashboard/value-seeker",
  },
  {
    logo: <WorkIcon className="mr-5" />,
    text: "Job Aprovals",
    link: "/admin/dashboard/job-aprovals",
  },
  {
    logo: <PaymentIcon className="mr-5" />,
    text: "Payment",
    link: "/admin/dashboard/payments",
  },
  {
    logo: <WarningIcon className="mr-5" />,
    text: "Reports",
    link: "/admin/dashboard/reports",
  },
  {
    logo: <SettingsIcon className="mr-5" />,
    text: "Settings",
    link: "/admin/dashboard/settings",
  },
];

const AdminSidebar = () => {
  return (
    <div className={styles.dashboard__sidebarLeft}>
      {/* navs */}
      <div className={styles.dashboard_navwrapper}>
        {adminNavs.map((nav, i) => (
          <div className={styles.dashboard_navitem} key={i}>
            {nav.logo} <Link href={nav.link}>{nav.text}</Link>
          </div>
        ))}
      </div>
      {/* bottom */}
      <div className={styles.dashboard__sidebarLeftBottom}>
        <div className={styles.dashboard__sidebarLeft_logout}>
          <ExitToAppIcon className="mr-5" />
          <LogOutButton style={{color: '#fff'}} />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
