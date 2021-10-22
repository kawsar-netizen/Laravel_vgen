import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { CheckCircle } from "@material-ui/icons";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  
  return (
    <div className={styles.popUpBox}>
      <div className={styles.popUp}>
        <div className={styles.success}>
          <h1>Congratulations</h1>
          <CheckCircle className={styles.successIcon} />
        </div>
        <strong>You have verified your emaill Successfully.</strong>
        {
          router.pathname === '/email/verify/success?type=seeker' ?
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
