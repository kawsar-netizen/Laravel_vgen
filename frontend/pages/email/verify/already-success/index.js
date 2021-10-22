import React from "react";
import styles from "./index.module.css";
import Link from 'next/link'
import {CheckCircleOutlined} from '@material-ui/icons'
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  
  return (
    <div className={styles.popUpBox}>
      <div className={styles.popUp}>
        <div className={styles.success}>
          <h1>You have already verified your email</h1>
          <CheckCircleOutlined className={styles.successIcon}/>
        </div>
        {
          router.pathname === '/email/verify/already-success?type=seeker' ?
          (<Link href="/valueseeker/login">
            <button className={styles.loginBtn}>Click Here to Login</button>
          </Link>)
          : (<Link href="/valuegenerator/login">
              <button className={styles.loginBtn}>Click Here to Login</button>
            </Link>)
        }
      </div>
    </div>
  );
};

export default index;