import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#F2F2F2",
  },
  btn1: {
    backgroundColor: "#155475",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#155475" },
  },
  btn2: {
    backgroundColor: "#529C16",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#529C16" },
  },
  btn3: {
    backgroundColor: "#EF621C",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  btn4:{
    backgroundColor: "#529C16",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#529C16" },
  },
  btn5:{
    backgroundColor: "#EF621C",
    color: "#fff",
    width: "100px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  btn6:{
    backgroundColor: "#000",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "12px",
    width: "80px",
    "&:hover": { backgroundColor: "#EF621C" },
  },
  updateStatus: {
    color: "#529C16",
    fontSize: "12px",
    fontWeight: 500,
  },
  activeStatus: {
    fontSize: "12px",
    display: "inline-block",
    color: "#fff",
    fontWeight: 500,
    borderRadius: "20px",
    color: "#529C16",
  },
  regularData: {
    fontSize: "12px",
    fontWeight: 500,
  },
  activeDot: {
    height: "10px",
    width: "10px",
    marginRight: "0.5em",
    borderRadius: "50%",
    backgroundColor: "#529C16",
  },
  activeStatusField: {
    display: "flex",
    alignItems: "center",
  },
  notActiveStatus: {
    color: "red",
    fontWeight: 500,
    fontSize: "12px",
    borderRadius: "20px",
  },
  notActiveDot: {
    height: "10px",
    width: "10px",
    marginRight: "0.5em",
    borderRadius: "50%",
    backgroundColor: "red",
  },
  marginAll: {
    marginBottom: 30,
  },
  increaseStar:{
    color: "black",
    fontSize: "12px"
  },
  starList:{
    listStyle: "none",
    display: "flex"
  },
  decreseStar:{
    color: "lightgray"
  },
  skills: {
    padding: "8px",
    borderRadius: "20px",
    backgroundColor: "#529C16",
    color: "#fff",
    fontWeight: 500,
  },
  iconSize: {
    fontSize: "12px"
  },
  valueSeekerProfile: {
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  avatar: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nidImg: {
    borderRadius: "5px",
    width:"100%",
    backgroundSize: "cover"
  },
  percentage: {
    color: "#529C16",
    fontSize: "20px",
    marginBottom: "2rem",
  },
  infoType: {
    fontWeight: 500,
  },
  timeCard: {
    backgroundColor: "#F4941C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    width: "auto",
    objectFit: "contain",
    color: "#fff !important",
  },
  rating: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
 commonColor:{
   color:"tomato",
   marginRight:10
 }
});
