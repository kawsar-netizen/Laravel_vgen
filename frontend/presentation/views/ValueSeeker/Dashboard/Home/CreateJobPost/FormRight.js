import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import FormInput from "../../../../../Components/Inputs/FormInput/FormInput";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../../../../../Components/Dropdown";
import styles from "./CreateJobPost.module.css";

const FormRight = ({ handleInputChange, values, editValues }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      {/* input1 */}
      <div className="flex">
        <Typography gutterBottom variant="h6" align="left">
          Work From
        </Typography>
        <div className="flex">
          {/* {editJobInfo ? (
            <Checkbox
              checked={!!editJobInfo.work_from}
              fontSize="small"
              name="work_from"
              onChange={handleInputChange}
              onClick={() => setIsChecked(!isChecked)}
            />
          ) : (
            <Checkbox
              checked={isChecked}
              fontSize="small"
              name="work_from"
              onChange={handleInputChange}
              onClick={() => setIsChecked(!isChecked)}
            />
          )} */}
          {editValues?.work_from !=="Remote Job" ? (
            <Checkbox
              checked={isChecked}
              fontSize="small"
              name="work_from"
              value={isChecked !== true && "Remote Job"}
              onChange={handleInputChange}
              onClick={() => setIsChecked(!isChecked)}
            />
          ) : (
            <Checkbox
              checked={!isChecked}
              fontSize="small"
              name="work_from"
              value={isChecked !== true && "Remote Job"}
              onChange={handleInputChange}
              onClick={() => setIsChecked(!isChecked)}
            />
          )}
          Anywhere in the world
        </div>
      </div>
      <FormControl style={{ width: "50%", marginTop: 10 }}>
        {!isChecked && (
          <Dropdown
            data={[
              { value: "Bangladeshi", label: "Bangladeshi" },
              { value: "Indian", label: "Indian" },
              { value: "Russian", label: "Russian" },
              { value: "Amerian", label: "Amerian" },
              { value: "Germany", label: "Germany" },
              { value: "Brazil", label: "Brazil" },
              { value: "Switzerland", label: "Switzerland" },
            ]}
            style={{ marginTop: 10, marginBottom: "1rem" }}
            value={values.work_from || editValues?.work_from}
            placeholder="Select Country"
            name="work_from"
            onChange={handleInputChange}
          />
        )}
      </FormControl>
      {/* input2 */}
      <Typography gutterBottom variant="h6" align="left">
        Job Type
      </Typography>
      <FormControl style={{ width: "50%" }}>
        <Dropdown
          data={[
            { value: "Full Time", label: "Full Time" },
            { value: "Contractual", label: "Contractual" },
            { value: "Hourly", label: "Hourly" },
          ]}
          style={{ marginTop: 10, marginBottom: "1rem" }}
          value={values.job_type || editValues?.job_type}
          placeholder="Select Job Type"
          name="job_type"
          onChange={handleInputChange}
        />
      </FormControl>
      {/* input3 */}
      <Typography variant="h6" align="left">
        Budget
      </Typography>
      <Grid spacing={3} container>
        <Grid item xs={6}>
          <div className="flex">
            <Typography
              gutterBottom
              variant="subtitle1"
              align="left"
              style={{ marginRight: 10 }}
            >
              From
            </Typography>
            <div className={styles.formInputField}>
              <input
                type="number"
                defaultValue={values.min_budget || editValues?.min_budget}
                name="min_budget"
                className={styles.inputField}
                placeholder="0"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="flex">
            <Typography
              gutterBottom
              variant="subtitle1"
              align="left"
              style={{ marginRight: 10 }}
            >
              To
            </Typography>
            <div className={styles.formInputField}>
              <input
                type="number"
                defaultValue={values.max_budget || editValues?.max_budget}
                name="max_budget"
                className={styles.inputField}
                placeholder="220"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Typography gutterBottom variant="h6" align="left">
        Apply Deadline
      </Typography>
      <div className={styles.formInputField}>
        <input
          type="date"
          defaultValue={values.deadline || editValues?.deadline}
          name="deadline"
          className={styles.inputField}
          onChange={handleInputChange}
        />
      </div>
      {/* //button */}
    </div>
  );
};

export default FormRight;
