import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import {
  sendData,
  getData,
  deleteData,
  updateData,
} from "../../../../../handler/apiHandler";
import Dropdown from "../../../../Components/Dropdown";
import cookie from "js-cookie";
import { server } from "../../../../../config/index";

const ProfileForm = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [token, setToken] = useState(null);
  const [isAddButton, setIsAddButton] = useState(false);
  const [languageData, setLanguageData] = useState([]);
  const [uniqueData, setUniqueData] = useState([]);
  const [personalData, setPersonalData] = useState();

  const nid_front_img = `http://127.0.0.1:8000/${personalData?.Details?.nid_front_img}`;
  const nid_back_img = `http://127.0.0.1:8000/${personalData?.Details?.nid_back_img}`;
  const face_img = `http://127.0.0.1:8000/${personalData?.Details?.face_img}`;

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    nationality: "",
    nid_number: "",
    country_code: "",
    mobile_no: "",
    secondary_email: "",
  });
  const [lang, setLang] = useState({
    name: "",
    level: "",
  });

  const emptyFormHandler = (setState) => {
    setState({});
  };

  useEffect(() => {
    const token = cookie.get("seekerUser");
    setToken(token);
    loadInputData(`/seeker/languages`, token, setLanguageData);
    loadInputData(`/seeker/edit-profile`, token, setPersonalData);
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChange = (event, setState, state) => {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const [uploadImage, setUploadImage] = useState({
    faceFile: null,
    nidFrontFile: null,
    nidBackFile: null,
    filePreviewFace: `https://i.ibb.co/ydbwrTS/nid-back.png`,
    filePreviewFront: `https://i.ibb.co/ydbwrTS/nid-back.png`,
    filePreviewBack: `https://i.ibb.co/ydbwrTS/nid-back.png`,
  });

  const handleFaceImageUpload = (event) => {
    setUploadImage({
      ...uploadImage,
      faceFile: event.target.files[0],
      filePreviewFace: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleFrontImageUpload = (event) => {
    setUploadImage({
      ...uploadImage,
      nidFrontFile: event.target.files[0],
      filePreviewFront: URL.createObjectURL(event.target.files[0]),
    });
  };
  const handleBackImageUpload = (event) => {
    setUploadImage({
      ...uploadImage,
      nidBackFile: event.target.files[0],
      filePreviewBack: URL.createObjectURL(event.target.files[0]),
    });
  };

  const testingImageUpload = async () => {
    const formData = new FormData();
    formData.append("nid_front_img", uploadImage.nidFrontFile);
    formData.append("nid_back_img", uploadImage.nidBackFile);
    formData.append("face_img", uploadImage.faceFile);

    const url = `${server}/seeker/update-profile`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((res) => console.log(res));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const editProfile = {
      first_name: values.first_name || personalData?.Details?.firstName,
      last_name: values.last_name || personalData?.Details?.lastName,
      dob: values.dob || personalData?.Details?.dob,
      nationality: values.nationality || personalData?.Details?.nationality,
      nid_number: values.nid_number || personalData?.Details?.nid_number,
      country_code: values.country_code || personalData?.Details?.country_code,
      mobile_no: values.mobile_no || personalData?.Details?.mobile_no,
      secondary_email:
        values.secondary_email || personalData?.Details?.secondary_email,
    };
    testingImageUpload();
    sendData(`/seeker/update-profile`, token, editProfile).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        console.log(responseJSON);
        loadInputData(`/seeker/edit-profile`, token, setPersonalData);
        alert("Profile Updated successfully");
      }
    });
  };

  // update api data for multiple sections start here

  let languageEditData = {
    name: lang.name || uniqueData?.editLanguage?.language,
    level: lang.level || uniqueData?.editLanguage?.level,
  };

  // update api data for multiple sections end here

  // CRUD api call functions start here

  const loadInputData = (type, token, setState) => {
    getData(type, token).then((result) => {
      let responseJSON = result;
      setState(responseJSON);
      console.log(responseJSON);
    });
  };

  const postInputData = (event, type, userInputData) => {
    event.preventDefault();
    const inputValues = { ...userInputData };
    console.log(inputValues);
    sendData(type, token, inputValues).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
    });
  };

  const loadUniqueInputData = (type) => {
    getData(type, token).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
      setUniqueData(responseJSON);
    });
  };

  const updateUniqueInputData = (type, editData) => {
    updateData(type, token, editData).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
    });
  };

  const deleteUniqueInputData = (type) => {
    deleteData(type, token).then((result) => {
      let responseJSON = result;
      console.log(responseJSON);
    });
  };

  return (
    <Box mt={2} mb={2}>
      {/* avatar */}
      <Box className={styles.profileImgWrapper}>
        {
          <Avatar
            sizes="2rem"
            className={styles.profileImg}
            alt="Remy Sharp"
            src={face_img ? face_img : uploadImage.filePreviewFace}
          />
        }
      </Box>
      {/* forms */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* first row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <label>First Name</label>
                <input
                  type="text"
                  defaultValue={
                    personalData?.Details?.firstName || values.first_name
                  }
                  placeholder="First Name"
                  name="first_name"
                  className={styles.inputField}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <label>Last Name</label>
                <input
                  type="text"
                  defaultValue={
                    personalData?.Details?.lastName || values.last_name
                  }
                  placeholder="Last Name"
                  name="last_name"
                  className={styles.inputField}
                  onChange={handleChange}
                />
              </div>
            </Grid>
          </Grid>
          <div className={styles.formInputField}>
            <label>Date of Birth</label>
            <input
              type="date"
              defaultValue={personalData?.Details?.dob || values.dob}
              placeholder="Dob"
              name="dob"
              className={styles.inputField}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formInputField}>
            <label style={{ marginBottom: 10 }}>Nationality</label>
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
              value={values.nationality || personalData?.Details?.nationality}
              placeholder="Select nationality"
              name="nationality"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInputField}>
            <label>NID Number</label>
            <input
              type="number"
              defaultValue={
                personalData?.Details?.nid_number || values.nid_number
              }
              placeholder="NID Number"
              name="nid_number"
              className={styles.inputField}
              onChange={handleChange}
            />
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.imageHolder}>
                <img
                  src={
                    nid_front_img ? nid_front_img : uploadImage.filePreviewFront
                  }
                  className={styles.img}
                />
              </div>

              <input
                type="file"
                label="NID Front Part"
                placeholder="NID Front Page"
                className={styles.input}
                bgc="#f2f2f2"
                name="nid_front_img"
                id="input-file"
                onChange={handleFrontImageUpload}
              />
              <div className={styles.fileHandle}>
                <p>Front page of NID</p>
                <label
                  htmlFor="input-file"
                  className={styles.fileLabel}
                  id="file-label"
                >
                  Chosse File
                </label>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.imageHolder}>
                <img
                  src={
                    nid_back_img ? nid_back_img : uploadImage.filePreviewBack
                  }
                  className={styles.img}
                />
              </div>
              <input
                type="file"
                label="NID Back Part"
                placeholder="NID Back Page"
                name="nid_back_img"
                className={styles.input}
                bgc="#f2f2f2"
                id="input-file-back"
                onChange={handleBackImageUpload}
              />
              <div className={styles.fileHandle}>
                <p>Back page of NID</p>
                <label
                  htmlFor="input-file-back"
                  className={styles.fileLabel}
                  id="file-label"
                >
                  Chosse File
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.imageHolder}>
                <img
                  src={
                    face_img
                      ? face_img
                      : uploadImage.filePreviewFace
                  }
                  className={styles.img}
                />
              </div>
              <input
                type="file"
                label="Face Verification"
                placeholder="Face Verification"
                name="face_img"
                className={styles.input}
                bgc="#f2f2f2"
                id="input-file-verification"
                onChange={handleFaceImageUpload}
              />
              <div className={styles.fileHandle}>
                <p>Face Verification</p>
                <label
                  htmlFor="input-file-verification"
                  name="face_img"
                  className={styles.fileLabel}
                  id="file-label"
                >
                  Verify Face
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <label style={{ marginBottom: 10 }}>Country Code</label>
                <Dropdown
                  placeholder="Select Country Code"
                  name="country_code"
                  data={[
                    { value: "+880", label: "+880" },
                    { value: "+990", label: "+990" },
                    { value: "+123", label: "+123" },
                    { value: "+456", label: "+456" },
                    { value: "+789", label: "+789" },
                    { value: "+812", label: "+812" },
                  ]}
                  style={{ marginTop: 10, marginBottom: "1rem" }}
                  value={
                    values.country_code || personalData?.Details?.country_code
                  }
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <label>Mobile Number</label>
                <input
                  type="text"
                  defaultValue={
                    personalData?.Details?.mobile_no || values.mobile_no
                  }
                  placeholder="Mobile Number"
                  name="mobile_no"
                  className={styles.inputField}
                  onChange={handleChange}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <label>Add Another Email</label>
                <input
                  type="text"
                  defaultValue={
                    personalData?.Details?.secondary_email ||
                    values.secondary_email
                  }
                  placeholder="Add another email"
                  name="secondary_email"
                  className={styles.inputField}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.formInputField}>
                <small>Added As Primary Email</small>
                <input
                  type="text"
                  value={personalData?.Details?.primaryEmail}
                  name="secondary_email"
                  className={styles.inputField}
                  readOnly
                />
              </div>
            </Grid>
          </Grid>
          <div className={styles.formHandle}>
            <Typography gutterBottom variant="subtitle2">
              Language
            </Typography>
            {!isAdd && (
              <div>
                <Button
                  onClick={() => {
                    setIsAdd(!isAdd);
                    setIsAddButton(!isAddButton);
                  }}
                  style={{ color: "blue", background: "transparent" }}
                >
                  Add new
                </Button>
              </div>
            )}
          </div>
          {/* language section start here */}
          <div>
            <div>
              {isAdd && (
                <div>
                  <Dropdown
                    placeholder="Select language"
                    name="name"
                    value={lang.name || uniqueData?.editLanguage?.language}
                    data={[
                      { value: "Bangla", label: "Bangla" },
                      { value: "English", label: "English" },
                      { value: "Spanish", label: "Spanish" },
                    ]}
                    onChange={() => handleInputChange(event, setLang, lang)}
                    style={{ marginBottom: 20 }}
                  />
                  <Dropdown
                    placeholder="Select level"
                    name="level"
                    value={lang.level || uniqueData?.editLanguage?.level}
                    data={[
                      { value: "Beginner", label: "Beginner" },
                      { value: "Intermediate", label: "Intermediate" },
                      { value: "Master", label: "Master" },
                    ]}
                    onChange={() => handleInputChange(event, setLang, lang)}
                    style={{ marginBottom: 10 }}
                  />
                  <Box mt={2} className="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setIsAdd(!isAdd);
                        setIsAddButton(isAddButton === 0);
                      }}
                    >
                      Cancel
                    </Button>
                    {isAddButton === false && (
                      <Button
                        style={{ marginLeft: 12 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setIsAdd(!isAdd);
                          updateUniqueInputData(
                            `/seeker/languages/${uniqueData.editLanguage?.id}`,
                            languageEditData
                          );
                          loadInputData(
                            `/seeker/languages`,
                            token,
                            setLanguageData
                          );
                          emptyFormHandler(setLang);
                        }}
                      >
                        Update
                      </Button>
                    )}
                    {isAddButton && (
                      <Button
                        style={{ marginLeft: 12 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setIsAdd(!isAdd);
                          postInputData(event, `/seeker/languages`, lang);
                          loadInputData(
                            `/seeker/languages`,
                            token,
                            setLanguageData
                          );
                          emptyFormHandler(setLang);
                          setIsAddButton(isAddButton === 0);
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </div>
              )}
            </div>
            <div className={styles.borderStyling}>
              {languageData?.Language?.map((language, index) => (
                <div key={language.id}>
                  {!isAdd && (
                    <div
                      style={{
                        marginBottom: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span>
                          {language.language ||
                            uniqueData.editLanguage?.language}{" "}
                          -
                        </span>

                        <span>
                          {language.level || uniqueData.editLanguage?.level}
                        </span>
                      </div>
                      <div>
                        <EditIcon
                          className={styles.actionButtons}
                          onClick={() => {
                            loadUniqueInputData(
                              `/seeker/languages/${language.id}/edit`
                            );
                            setIsAdd(!isAdd);
                          }}
                        />
                        <DeleteIcon
                          className={styles.actionButtons}
                          onClick={() => {
                            deleteUniqueInputData(
                              `/seeker/languages/${language.id}`
                            );
                            loadInputData(
                              `/seeker/languages`,
                              token,
                              setLanguageData
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* language section end here */}

          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Grid>
      {/* button */}
      <Box mt={5} className="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFormSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileForm;
