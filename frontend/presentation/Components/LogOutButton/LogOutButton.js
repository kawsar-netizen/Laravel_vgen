import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles  from './LogOutButton.module.css'

const LogOutButton = ({ style }) => {
  const router = useRouter();
  const logOutHandle = () => {
    // const user = 'adminUser' ? 'adminUser' : 'seekerUser' ? 'seekerUser' : 'generatorUser'
    sessionStorage.clear() ||
      Cookies.remove('seekerUser')
      Cookies.remove('generatorUser')
      Cookies.remove('adminUser')
      localStorage.clear();
    router.push("/");
  };
  return <button style={style} className={styles.logoutButton} onClick={logOutHandle}>Log Out</button>;
};

export default LogOutButton;
