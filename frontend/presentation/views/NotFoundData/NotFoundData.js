import styles from "./NotFoundData.module.css";

const NotFoundData = () => {
  return (
    <div className={styles.noImgHandle}>
      <img
        src="/assets/images/Images/noData.png"
        className={styles.noDataImg}
      />
    </div>
  );
};

export default NotFoundData;
