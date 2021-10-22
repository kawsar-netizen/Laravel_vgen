import Link from "next/link";
import HelpIcon from "@material-ui/icons/Help";
import styles from "./Login.module.css";

const LoginRight = () => {
  return (
    <div className={styles.loginLeft}>
      <img
        src="/assets/images/Images/Image_4.png"
        height="100%"
        width="100%"
        alt="asa"
      />
      <Link href="/">
        <img
          className={styles.logo}
          src="/assets/images/Icons/vgenlogo.png"
          alt="vgen"
        />
      </Link>
    </div>
  );
};

export default LoginRight;