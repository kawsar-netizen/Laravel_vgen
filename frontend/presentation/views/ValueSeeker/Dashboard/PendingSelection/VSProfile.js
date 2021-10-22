import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Layout from "../../../../Layout/Layout";
import TaskStatusCardsRow from "../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";

const VSProfile = ({ singleProfile }) => {
  console.log(singleProfile);
  const firstName = singleProfile?.firstName;
  const lastName = singleProfile?.lastName;
  const fullName = firstName?.concat(" " + lastName);
  return (
    <Layout>
      <Container>
        {/* task status row */}
        <TaskStatusCardsRow />
        <Typography gutterBottom variant="h6" align="left">
          Viewing Profile
        </Typography>
        {/* images */}
        <Box mb={2} className="flex">
          {singleProfile?.profilePicture === "not found" ? (
            <Avatar
              style={{
                maxHeight: "80px",
                height: "80px",
                width: "80px",
                objectFit: "contain",
              }}
              variant="rounded"
              alt="Remy Sharp"
              src="/assets/images/Images/notFound.png"
            />
          ) : (
            <Avatar
              style={{
                maxHeight: "80px",
                height: "80px",
                width: "80px",
              }}
              variant="rounded"
              alt="Remy Sharp"
              src={singleProfile?.profilePicture}
            />
          )}
          <Box ml={2} borderColor="transparent">
            <Typography gutterBottom variant="h6">
              {fullName}
            </Typography>
            <Typography variant="subtitle1">
              {singleProfile?.designation ? (
                singleProfile?.designation
              ) : (
                <>No Data</>
              )}
            </Typography>
            <Typography variant="subtitle1">
              {singleProfile?.completedProjects ? (
                <small>{singleProfile?.completedProjects} Projects</small>
              ) : (
                <>No Data</>
              )}
            </Typography>
          </Box>
        </Box>
        {/* content */}
        <Typography gutterBottom variant="h6" align="left">
          About Me
        </Typography>
        <Typography gutterBottom variant="body2" align="left">
          {singleProfile?.aboutMe === "not found" ? (
            <>No Data</>
          ) : (
            singleProfile?.aboutMe
          )}
        </Typography>
        <Typography gutterBottom variant="h6" align="left">
          Educations
        </Typography>
        {singleProfile?.instituteName?.length || singleProfile?.instituteCountry?.length ?<div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <>
            <div>
              {singleProfile?.instituteName?.map((name) => (
                <p style={{ marginRight: 10 }}>{name.institute_type}</p>
              ))}
            </div>
            <div>
              {singleProfile?.instituteCountry?.map((name) => (
                <p>{name.country}</p>
              ))}
            </div>
          </>
        </div> : <>No Data</>}
        <Typography gutterBottom variant="h6" align="left">
          Certificates
        </Typography>
        {singleProfile?.certificationTitle?.length || singleProfile?.certifiedBy?.length ?<div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div>
            {singleProfile?.certificationTitle?.map((name) => (
              <p style={{ marginRight: 10 }}>{name.certification_title}</p>
            ))}
          </div>
          <div>
            {singleProfile?.certifiedBy?.map((name) => (
              <p>{name.certified_by}</p>
            ))}
          </div>
        </div> : <>No Data</>}
        <Typography gutterBottom variant="h6" align="left">
          Language
        </Typography>
        {singleProfile?.languages?.length ?<div>
          {singleProfile?.languages?.map((name) => (
            <p>{name.language}</p>
          ))}
        </div> : <>No Data</>}
        {/* review */}
        <Typography gutterBottom variant="h6" align="left">
          Clients Feedback
        </Typography>
        <Grid container>
          {[1, 2, 3].map((item) => (
            <Grid key={item} item xs={12} md={4}>
              <Box mb={2} className="flex">
                <Avatar
                  alt="Remy Sharp"
                  src="/assets/images/Images/client.jpg"
                />
                <Box ml={2} borderColor="transparent">
                  <Typography variant="subtitle2">Steven Smith</Typography>
                  <Typography variant="body2">
                    It was a plesure to work
                  </Typography>
                  <Rating size="small" name="read-only" value={5} readOnly />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* button */}
        <Button variant="contained" color="secondary">
          Start Conversation
        </Button>
      </Container>
    </Layout>
  );
};

export default VSProfile;
