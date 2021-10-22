import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import Image from "next/image";
import { useStyles } from "../BaseStyles/BaseStyles";
import cookie from "js-cookie";

const ProfileInfo = ({ profile }) => {
  const firstName = profile?.basicInformation?.firstName;
  const lastName = profile?.basicInformation?.lastName;
  const fullName = firstName?.concat(" " + lastName);

  const commonURL = `http://127.0.0.1:8000`;

  // const loadUserLists = () => {
  //   const adminToken = cookie.get("adminUser");
  //   console.log(adminToken);
  //   getData(`/admin/generator-list`, adminToken).then((result) => {
  //     let responseJSON = result;
  //     setStatus(responseJSON?.data?.data)
  //     console.log(responseJSON)
  //   });
  // };

  const handleUser = (id) => {
    getData(`/admin/generator-status/${id}`, token).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        console.log(responseJSON);
        // alert(`${responseJSON.message}`);
      }
    });
  };

  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.valueSeekerProfile}>
        {/* Avatar */}
        <Avatar
          src={profile?.personalInformation?.faceImage}
          className={classes.avatar}
        />
        <Typography
          className={classes.percentage}
          align="center"
          variant="subtitle1"
        >
          {fullName}
        </Typography>
        {/* details*/}
        <Box mt={2} mb={2}>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Full Name
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {fullName ? fullName : <>No Data</>}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Date of Birth
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {profile?.personalInformation?.birthDate ? (
                    profile?.personalInformation?.birthDate
                  ) : (
                    <>No Data</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Country
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {profile?.personalInformation?.country ? (
                    profile?.personalInformation?.country
                  ) : (
                    <>No Data</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  NID Number
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {profile?.personalInformation?.nidNumber ? (
                    profile?.personalInformation?.nidNumber
                  ) : (
                    <>No Data</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Mobile Number
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {profile?.personalInformation?.mobileNumber ? (
                    profile?.personalInformation?.mobileNumber
                  ) : (
                    <>No Data</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Email Address
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {profile?.basicInformation?.emailAddress ? (
                    profile?.basicInformation?.emailAddress
                  ) : (
                    <>No Data</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Address
                </Typography>
                {profile?.Address !== null ? (
                  <>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {profile?.Address?.present_village},{" "}
                      {profile?.Address?.present_holding_no},{" "}
                      {profile?.Address?.present_district}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {profile?.Address?.present_division &&
                        profile?.Address?.present_division}
                    </Typography>
                  </>
                ) : (
                  <>No Data</>
                )}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Language
                </Typography>
                {profile?.Language?.map((lang) => (
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {lang.languageName ? lang.languageName : <>No Data</>}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Education
                </Typography>
                {profile?.Education?.map((education) => (
                  <div style={{ marginBottom: 10 }}>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {education.instituteCountry ? (
                        education.instituteCountry
                      ) : (
                        <>No Data</>
                      )}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {education.instituteName ? (
                        education.instituteName
                      ) : (
                        <>No Data</>
                      )}
                    </Typography>
                  </div>
                ))}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Certificate
                </Typography>
                {profile?.Certificate?.map((certificate) => (
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    {certificate.certificationTitle ? (
                      certificate.certificationTitle
                    ) : (
                      <>No Data</>
                    )}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography className={classes.infoType} variant="subtitle1">
                  Payment Method
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {<>No Data</>}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/*skills*/}
        <Typography
          gutterBottom
          className={classes.infoType}
          variant="subtitle1"
        >
          Skiils
        </Typography>
        <Box mb={3}>
          <Grid container spacing={3}>
            {profile?.Skill?.map((items) => (
              <Grid item key={items} xs={12} lg={3}>
                <Box className={classes.skills}>
                  <Typography align="center" variant="body2">
                    {items.skillName}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* nid card */}
        <Typography
          gutterBottom
          className={classes.infoType}
          variant="subtitle1"
        >
          NID Card
        </Typography>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              {profile?.personalInformation?.nidFrontImg ===
              `${commonURL}/noNidFrontImg` ? (
                <img
                  src="/assets/images/Images/notFound.png"
                  alt="Picture of the author"
                  className={classes.nidImg}
                />
              ) : (
                <img
                  src={profile?.personalInformation?.nidFrontImg}
                  alt="Picture of the author"
                  className={classes.nidImg}
                />
              )}
              <Typography gutterBottom variant="body1">
                FrontPage of NID
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {profile?.personalInformation?.nidBackImg ===
              `${commonURL}/noNidBackImg` ? (
                <img
                  src="/assets/images/Images/notFound.png"
                  alt="Picture of the author"
                  className={classes.nidImg}
                />
              ) : (
                <img
                  src={profile?.personalInformation?.nidBackImg}
                  alt="Picture of the author"
                  className={classes.nidImg}
                />
              )}
              <Typography gutterBottom variant="body1">
                BackPage of NID
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* action buttons */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            {/* {userList.status_lable === "Active" && (
              <Button
                color="inherit"
                variant="contained"
                className={classes.btn3}
                size="small"
                onClick={() =>
                  handleUser(profile?.basicInformation?.generatorId)
                }
              >
                Ban User
              </Button>
            )}
            {userList.status_lable !== "Active" && (
              <Button
                color="inherit"
                variant="contained"
                className={classes.btn4}
                size="small"
                onClick={() =>
                  handleUser(profile?.basicInformation?.generatorId)
                }
              >
                Approve
              </Button>
            )} */}
          </Grid>
          {/* <Grid item xs={12} md={4} lg={4}>
            <Button variant="contained" className={classes.btn5}>
              Decline
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileInfo;
