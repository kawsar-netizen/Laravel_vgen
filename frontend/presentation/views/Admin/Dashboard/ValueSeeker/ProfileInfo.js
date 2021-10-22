import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../BaseStyles/BaseStyles";

const ProfileInfo = ({ profile }) => {
  const firstName = profile?.basicInformation?.firstName;
  const lastName = profile?.basicInformation?.lastName;
  const fullName = firstName?.concat(" " + lastName);

  const commonURL = `http://127.0.0.1:8000`;

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
                  Payment Method
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  {<>No Data</>}
                </Typography>
              </Box>
            </Grid>
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
      </Box>
    </Container>
  );
};

export default ProfileInfo;
