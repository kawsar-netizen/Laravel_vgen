import { Button } from "@material-ui/core";
import styles from "./FormButton.module.css";
import Link from "next/link";

const FormButton = ({ text, icon, style, link, type, disabled, onClick }) => {
  return (
    <Link href={link ? link : ''}>
      <Button variant="contained" type={type} onClick={onClick} disabled={disabled} style={style} className={styles.btn}>
        {text} {icon}
      </Button>
    </Link>
  );
};

export default FormButton;
