import styles from "./FormInput.module.css";

const FormInput = ({
  icon,
  type,
  placeholder,
  label,
  bgc,
  name,
  onChange,
  defaultValue,
  value,
}) => {
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <div
        style={{ backgroundColor: bgc ? `${bgc}` : "#b1d9f8" }}
        className={styles.input}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default FormInput;
