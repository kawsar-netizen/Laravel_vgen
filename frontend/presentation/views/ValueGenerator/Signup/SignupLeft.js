import Link from "next/link";
import styles from "./Signup.module.css";
import HelpIcon from "@material-ui/icons/Help";
import { Typography } from "@material-ui/core";

const SignupLeft = () => {
  return (
    <div className={styles.signupleft}>
      <img
        src="/assets/images/Images/Image_3.png"
        height="100%"
        width="100%"
        alt="asa"
      />
      <div className={styles.box}>
        <Typography variant="h6">
          Fastest Growing Job portal site of Bangladesh
        </Typography>
        <Typography variant="subtitle2">
          Create an account and be a part of our community
        </Typography>
      </div>
      <Link href="/">
        <img
          className={styles.logo}
          src="/assets/images/Icons/vgenlogo.png"
          alt="vgen"
        />
      </Link>
      <span className={styles.helpandsupport}>
        <Link href="/help-and-support">
          <div style={{ display: "inline-flex" }}>
            Help and Support?
            <HelpIcon fontSize="small" />
          </div>
        </Link>
        <br /> Copyright @ 2021 Vgen
      </span>
    </div>
  );
};

export default SignupLeft;
