import styles from "./SidebarLeft.module.css";
import { Typography } from "@material-ui/core";
import Image from "next/image";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import PersonIcon from "@material-ui/icons/Person";
import { useEffect, useState } from "react";
import LogOutButton from '../../Components/LogOutButton/LogOutButton'

const navsForVS = [
  {
    logo: <HomeIcon className="mr-5 " fontSize="small" />,
    text: "Home",
    link: "/valueseeker/dashboard",
  },
  {
    logo: <HourglassFullIcon className="mr-5" fontSize="small" />,
    text: "Pending Selection",
    link: "/valueseeker/dashboard/pending-selection",
  },
  {
    logo: <AddCircleOutlineIcon className="mr-5" fontSize="small" />,
    text: "Add Money",
    link: "/valueseeker/dashboard/addmoney",
  },
  {
    logo: <SettingsBackupRestoreIcon className="mr-5" fontSize="small" />,
    text: "Pending Payment",
    link: "/valueseeker/dashboard/pending-payment",
  },
  {
    logo: <SettingsBackupRestoreIcon className="mr-5" fontSize="small" />,
    text: "Completed Task",
    link: "/valueseeker/dashboard/completed-task",
  },
  {
    logo: <PersonIcon className="mr-5" fontSize="small" />,
    text: "Edit Profile",
    link: "/valueseeker/dashboard/edit-profile",
  },
];

const navsforVg = [
  {
    logo: <HomeIcon className="mr-5 " fontSize="small" />,
    text: "Home",
    link: "/valuegenerator/dashboard",
  },
  {
    logo: <HourglassFullIcon className="mr-5" fontSize="small" />,
    text: "Ongoing Task",
    link: "/valuegenerator/dashboard/ongoing-tasks",
  },
  {
    logo: <SettingsBackupRestoreIcon className="mr-5" fontSize="small" />,
    text: "Completed Task",
    link: "/valuegenerator/dashboard/completed-task",
  },
  {
    logo: <AddCircleOutlineIcon className="mr-5" fontSize="small" />,
    text: "My Wallet",
    link: "/valuegenerator/dashboard/wallet",
  },
  {
    logo: <PersonIcon className="mr-5" fontSize="small" />,
    text: "Edit Profile",
    link: "/valuegenerator/dashboard/edit-profile",
  },
];

const SidebarLeft = () => {
  const [vg, setVG] = useState(false);

  useEffect(() => {
    if (/valuegenerator/.test(window?.location?.href)) {
      setVG(true);
    }
  }, []);
  return (
    <div className={styles.dashboard__sidebarLeft}>
      {/* logo */}
      <div className={styles.logo}>
        <Link href="/">
          <span>
            <Image
              src="/assets/images/Icons/vgenlogo.png"
              height="50px"
              width="100px"
              alt="logo"
            />
          </span>
        </Link>
      </div>
      {/* navs */}
      {vg
        ? navsforVg.map((nav, i) => (
            <div className={styles.dashboard_navitem} key={i}>
              {nav.logo} <Link href={nav.link}>{nav.text}</Link>
            </div>
          ))
        : navsForVS.map((nav, i) => (
            <div className={styles.dashboard_navitem} key={i}>
              {nav.logo} <Link href={nav.link}>{nav.text}</Link>
            </div>
          ))}
      {/* bottom */}
      <div className={styles.dashboard__sidebarLeftBottom}>
        <div className={styles.dashboard__sidebarLeft_logout}>
          <ExitToAppIcon className="mr-5" fontSize="small" color="error" />{" "}
          <LogOutButton style={{color: 'red'}} />
        </div>
        <Typography align="center" variant="body2">
          v.01.0.1
        </Typography>
      </div>
    </div>
  );
};

export default SidebarLeft;
