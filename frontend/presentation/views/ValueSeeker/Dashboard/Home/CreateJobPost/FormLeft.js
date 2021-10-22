import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Dropdown from "../../../../../Components/Dropdown";
// import FormInput from "../../../../../Components/Inputs/FormInput/FormInput";
import RequiredSkills from "../../../../../Components/Inputs/RequiredSkills/RequiredSkills";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./CreateJobPost.module.css";
import cookie from 'js-cookie'
import { useState } from 'react'
import { getData, deleteData } from "../../../../../../handler/apiHandler";

const FormLeft = ({ handleInputChange, tags, setTags, values, editValues }) => {

  const [editedJob, setEditedJob] = useState([])

  const editJobPostData = () =>{
    const userInfo = cookie.get('seekerUser')
    getData(`/seeker/job/${editValues?.id}/edit`, userInfo).then(result =>{
      setEditedJob(result?.data?.job)
      console.log(result)
    })
  }
  
  const deleteTag = (id) =>{
    const userInfo = cookie.get('seekerUser')
    deleteData(`/seeker/job/skill/${id}`, userInfo).then(result =>{
      let response = result
      console.log(response)
      if(response.message){
        editJobPostData()
      }
    })
  }
  return (
    <div>
      {/* input1 */}
      <Typography variant="h6" align="left">
        Job Title
      </Typography>
      <Typography style={{ color: "#9c9c9c" }} variant="body2" align="left">
        Looking For a
      </Typography>

      <div className={styles.formInputField}>
        <input
          type="text"
          defaultValue={values?.title || editValues?.title}
          placeholder="Job title"
          name="title"
          className={styles.inputField}
          onChange={handleInputChange}
        />
      </div>
      {/* input2 */}
      <Typography gutterBottom variant="h6" align="left">
        Add Job Description
      </Typography>
      <textarea
        type="text"
        rows="6"
        cols="50"
        defaultValue={values.description || editValues?.description}
        placeholder="Description"
        name="description"
        className={styles.inputField}
        onChange={handleInputChange}
      />
      <Typography gutterBottom variant="h6" align="left">
        Experience Level
      </Typography>
      <Dropdown
        data={[
          { value: "Beginner", label: "Beginner" },
          { value: "Intermediate", label: "Intermediate" },
          { value: "Expert", label: "Expert" },
        ]}
        style={{ marginTop: 10, marginBottom: "1rem" }}
        value={values.experience_level || editValues?.experience_level}
        placeholder="Select Level"
        name="experience_level"
        onChange={handleInputChange}
      />

      <Typography variant="h6" align="left">
        Required Skill
      </Typography>
      <RequiredSkills tags={tags} setTags={setTags} />

     { editValues?.skills && <Typography style={{marginBottom: 20}} variant="h6" align="left">
        Saved Skills
      </Typography>}
        
      <Grid spacing={3} container >
        {editedJob?.skills ? editedJob?.skills.map((item) => (
          <div key={item.skill} className={styles.skillContainer}>
            <label className={styles.tagLevel}>{item.skill}</label>
            <div className={styles.modifyButtons}>
              <DeleteIcon
                className={styles.actionButtons}
                onClick={() => deleteTag(item?.id)}
              />
            </div>
          </div>
        )) : editValues?.skills.map((item) => (
          <div key={item.skill} className={styles.skillContainer}>
            <label className={styles.tagLevel}>{item.skill}</label>
            <div className={styles.modifyButtons}>
              <DeleteIcon
                className={styles.actionButtons}
                onClick={() => deleteTag(item?.id)}
              />
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default FormLeft;
