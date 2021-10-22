import { Typography } from "@material-ui/core";

const Title = ({ text, variant }) => {
  return variant === "2" ? (
    <div style={{ padding: "1rem 0rem" }} className="flex-column">
      <Typography color="secondary" gutterBottom variant="h6">
        {text}
      </Typography>
      <div
        style={{
          height: "5px",
          width: "60px",
          backgroundColor: "#fff",
          borderRadius: "3px",
        }}
      ></div>
    </div>
  ) : (
    <div style={{ padding: "3rem 1rem" }} className="center-column">
      <Typography gutterBottom align="center" variant="h4">
        {text}
      </Typography>
      <div
        style={{
          height: "5px",
          width: "80px",
          backgroundColor: "#106eb8",
          borderRadius: "3px",
        }}
      ></div>
    </div>
  );
};

export default Title;
