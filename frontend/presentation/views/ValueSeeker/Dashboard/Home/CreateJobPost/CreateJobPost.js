import Layout from "../../../../../Layout/Layout";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import StatusCard from "../../../../../Components/Cards/StatusCard/StatusCard";
import FormLeft from "./FormLeft";
import FormRight from "./FormRight";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../../../../context/UserContext";
// import { sendData } from "next/dist/next-server/server/api-utils";
import Link from "next/link";
import { sendData, updateData } from "../../../../../../handler/apiHandler";
import TaskStatusCardsRow from "../../../../../parts/TaskStatusCardsRow/TaskStatusCardsRow";
import useButtonLoader from "../../../../../Hooks/useButtonLoader";
import styles from "./CreateJobPost.module.css";
import cookie from "js-cookie";

const CreateJobPost = ({ editJobPost }) => {
  const [tags, setTags] = useState([]);
  const [seekerJobCreateData, setSeekerJobCreateData] = useContext(UserContext);
  const [createdJob, setCreatedJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [postButton, setPostButton] = useButtonLoader(
  //   "Post Job",
  //   "Posting Job..."
  // );
  // const [editButton, setEditButton] = useButtonLoader(
  //   "Edit Job",
  //   "Editing Job..."
  // );
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    description: "",
    work_from: "",
    job_type: "",
    min_budget: "",
    max_budget: "",
    experience_level: "",
    deadline: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  console.log(values.work_from);

  const handlePostJob = async (e) => {
    // setPostButton(true);
    setIsLoading(true);
    const userInfo = cookie.get("seekerUser");
    e.preventDefault();
    let skills = {
      skills: tags,
    };
    const skillSet = JSON.stringify(skills);
    console.log(skillSet);
    const jobData = { ...values, skills: skillSet };

    sendData(`/seeker/job`, userInfo, jobData).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        alert("Job posted successfully");
        setCreatedJob(responseJSON?.data?.jobs);
        setSeekerJobCreateData(responseJSON?.data?.jobs);
        console.log(createdJob.id);
        // router.push(`/valueseeker/dashboard/postedJob/${createdJob?.id}`);
      }
      if (responseJSON.success || responseJSON) {
        setIsLoading(false);
      }
    });
  };

  const handleEditJob = (e) => {
    // setEditButton(true);
    setIsEditing(true);
    const userInfo = cookie.get("seekerUser");
    e.preventDefault();
    let skills = {
      skills: tags,
    };

    const skillSet = JSON.stringify(skills);
    console.log(skillSet);
    const editedData = {
      title: values.title || editJobPost?.title,
      description: values.description || editJobPost?.description,
      work_from: values.work_from || editJobPost?.work_from,
      job_type: values.job_type || editJobPost?.job_type,
      min_budget: values.min_budget || editJobPost?.min_budget,
      max_budget: values.max_budget || editJobPost?.max_budget,
      experience_level:
        values.experience_level || editJobPost?.experience_level,
      deadline: values.deadline || editJobPost?.deadline,
      skills: skillSet,
    };

    updateData(`/seeker/job/${editJobPost?.id}/`, userInfo, editedData).then(
      (result) => {
        let response = result;
        console.log(response);
        if (response.success) {
          alert("Job Post Edited successfully");
          setCreatedJob(response?.data?.job);
        }
        if (response.success || response) {
          setIsEditing(false);
        }
      }
    );
  };

  return (
    <Layout>
      <Container>
        {/* task status row */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TaskStatusCardsRow />
        </div>
        <div style={{ padding: "2rem" }}></div>
        <Typography
          style={{ color: "#0c88e9" }}
          gutterBottom
          variant="h6"
          align="left"
        >
          {editJobPost?.job_type ? <>Edit Job Post</> : <>Create Job Post</>}
        </Typography>
        <Grid spacing={4} container>
          {/* Form Left */}
          <Grid item xs={12} md={6}>
            <FormLeft
              tags={tags}
              setTags={setTags}
              values={values}
              editValues={editJobPost}
              handleInputChange={handleInputChange}
            />
          </Grid>
          {/* Form Right */}
          <Grid item xs={12} md={6}>
            <FormRight
              handleInputChange={handleInputChange}
              handlePostJob={handlePostJob}
              handleEditJob={handleEditJob}
              editValues={editJobPost}
              values={values}
            />
          </Grid>
        </Grid>
        <div className="flex-end">
          <div className="flex-end">
            {editJobPost?.job_type ? (
              <>
                {!isEditing ? (
                  <button
                    className={styles.buttonStyle}
                    onClick={handleEditJob}
                    // ref={editButton}
                  >
                    Edit Job
                  </button>
                ) : (
                  <button
                    className={styles.buttonStyle2}
                    // ref={editButton}
                  >
                    Editing Job...
                  </button>
                )}
              </>
            ) : (
              <>
                {!isLoading ? (
                  <button
                    className={styles.buttonStyle}
                    onClick={handlePostJob}
                    // ref={postButton}
                  >
                    Post Job
                  </button>
                ) : (
                  <button
                    className={styles.buttonStyle2}
                    type="button"
                    disabled
                  >
                    Posting Job...
                  </button>
                )}
              </>
            )}
          </div>
          {createdJob.id && (
            <div style={{ marginLeft: 10 }}>
              <Link
                href="/valueseeker/dashboard/postedJob/[id]"
                as={`/valueseeker/dashboard/postedJob/${createdJob.id}`}
              >
                <button className={styles.buttonStyle}>View Post</button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CreateJobPost;
