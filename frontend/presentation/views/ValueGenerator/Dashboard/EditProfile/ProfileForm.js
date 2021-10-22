import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
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
import { server } from "../../../../../config/index";
import axios from "axios";

const ProfileForm = () => {
  const [token, setToken] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const [isEducationBtn, setIsEducationBtn] = useState(false);
  const [isCertificateBtn, setIsCertificateBtn] = useState(false);
  const [isAddButton, setIsAddButton] = useState(false);
  const [isSkillsBtn, setIsSkillsBtn] = useState(false);

  const [languageData, setLanguageData] = useState([]);
  const [certificateData, setCertificateData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [uniqueData, setUniqueData] = useState([]);
  const [personalData, setPersonalData] = useState();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    description: "",
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

  const [education, setEducation] = useState({
    institute_type: "",
    country: "",
    major: "",
    compilition_year: "",
  });

  const [certificate, setCertificate] = useState({
    certification_title: "",
    certified_by: "",
    year: "",
  });

  const [skills, setSkills] = useState({
    skill: "",
  });

  useEffect(() => {
    const userToken = JSON.parse(sessionStorage.getItem("generatorUser"));
    setToken(userToken.token);

    const generatorToken = userToken.token;
    loadInputData(`/generator/languages`, generatorToken, setLanguageData);
    loadInputData(`/generator/educations`, generatorToken, setEducationData);
    loadInputData(
      `/generator/certificates`,
      generatorToken,
      setCertificateData
    );
    loadInputData(`/generator/skills`, generatorToken, setSkillsData);
    loadInputData(`/generator/details`, generatorToken, setPersonalData);
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

    const url = `${server}/generator/details`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((res) => console.log(res));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const editProfile = {
      first_name: values.first_name || personalData?.Details?.firstName,
      last_name: values.last_name || personalData?.Details?.lastName,
      description: values.description || personalData?.Details?.description,
      dob: values.dob || personalData?.Details?.dob,
      nationality: values.nationality || personalData?.Details?.nationality,
      nid_number: values.nid_number || personalData?.Details?.nid_number,
      country_code: values.country_code || personalData?.Details?.country_code,
      mobile_no: values.mobile_no || personalData?.Details?.mobile_no,
      secondary_email:
        values.secondary_email || personalData?.Details?.secondary_email,
    };
    console.log(editProfile);
    testingImageUpload();
    sendData(`/generator/details`, token, editProfile).then((result) => {
      let responseJSON = result;
      if (responseJSON.success) {
        console.log(responseJSON);
        loadInputData(`/generator/details`, token, setPersonalData);
        alert("Profile Updated successfully");
      }
    });
  };

  // update api data for multiple sections start here

  let languageEditData = {
    name: lang.name || uniqueData?.editLanguage?.language,
    level: lang.level || uniqueData?.editLanguage?.level,
  };
  let educationEditData = {
    institute_type:
      education.institute_type || uniqueData?.editEducation?.institute_type,
    country: education.country || uniqueData?.editEducation?.country,
    major: education.major || uniqueData?.editEducation?.major,
    compilition_year:
      education.compilition_year || uniqueData?.editEducation?.compilition_year,
  };
  let certificationEditData = {
    certification_title:
      certificate.certification_title ||
      uniqueData?.EditCertificate?.certification_title,
    certified_by:
      certificate.certified_by || uniqueData?.EditCertificate?.certified_by,
    year: certificate.year || uniqueData?.EditCertificate?.year,
  };
  let skillEditData = {
    skill: skills.skill || uniqueData?.EditSkill?.skill,
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
            src={
              personalData?.faceImage
                ? personalData?.faceImage
                : uploadImage.filePreviewFace
            }
          />
        }
        {/* <input
          type="file"
          className={styles.input}
          bgc="#f2f2f2"
          name="face_img"
          id="input-file-profile"
          onChange={handleFaceImageUpload}
        />
        <label htmlFor="input-file-profile" id="file-label">
          <EditIcon className={styles.editIcon} color="secondary" />
        </label> */}
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
            <label>Description</label>
            <textarea
              type="text"
              rows="6"
              cols="50"
              defaultValue={
                personalData?.Details?.description || values.description
              }
              placeholder="Description"
              name="description"
              className={styles.inputField}
              onChange={handleChange}
            />
          </div>
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
                    personalData?.nidFrontImage
                      ? personalData?.nidFrontImage
                      : uploadImage.filePreviewFront
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
                    personalData?.nidBackImage
                      ? personalData?.nidBackImage
                      : uploadImage.filePreviewBack
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
                    personalData?.faceImage
                      ? personalData?.faceImage
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
          <Box mt={5} mb={5} className="flex-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFormSubmit}
            >
              Update
            </Button>
          </Box>
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
                            `/generator/languages/${uniqueData.editLanguage?.id}`,
                            languageEditData
                          );
                          loadInputData(
                            `/generator/languages`,
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
                          postInputData(event, `/generator/languages`, lang);
                          loadInputData(
                            `/generator/languages`,
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
                              `/generator/languages/${language.id}/edit`
                            );
                            setIsAdd(!isAdd);
                          }}
                        />
                        <DeleteIcon
                          className={styles.actionButtons}
                          onClick={() => {
                            deleteUniqueInputData(
                              `/generator/languages/${language.id}`
                            );
                            loadInputData(
                              `/generator/languages`,
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

          {/* Link account section start here  */}
          {/* <Grid>
            <div className={styles.formHandle}>
              <Typography gutterBottom variant="subtitle2">
                Link Account
              </Typography>
              <div>
                <IconButton
                  onClick={() => handleRemoveFields(0, website, setWebsite)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleAddFields(website, setWebsite)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>
            <div>
              <FormInput
                type="text"
                placeholder="Type"
                name="type"
                bgc="#f2f2f2"
                // value={web.type}
                // onChange={(event) =>
                //   handleInputChange(index, event, website, setWebsite)
                // }
                value={values.type}
                onChange={handleChange}
              />
              <FormInput
                type="text"
                name="link"
                placeholder="Link"
                bgc="#f2f2f2"
                value={values.link}
                onChange={handleChange}
              />
            </div>
          </Grid> */}

          {/* Link account section end here  */}

          {/* Education section start here  */}
          <Grid>
            <div className={styles.formHandle}>
              <Typography gutterBottom variant="subtitle2">
                Education
              </Typography>
              {!isEducationBtn && (
                <div>
                  <Button
                    onClick={() => {
                      setIsEducationBtn(!isEducationBtn);
                      setIsAddButton(!isAddButton);
                    }}
                    style={{ color: "blue", background: "transparent" }}
                  >
                    Add new
                  </Button>
                </div>
              )}
            </div>
            <div>
              {isEducationBtn && (
                <div>
                  <div className={styles.formInputField}>
                    <input
                      type="text"
                      placeholder="College/university"
                      name="institute_type"
                      defaultValue={
                        education.institute_type ||
                        uniqueData?.editEducation?.institute_type
                      }
                      onChange={(event) =>
                        handleInputChange(event, setEducation, education)
                      }
                      className={styles.inputField}
                    />
                  </div>
                  <Dropdown
                    placeholder="Select Country"
                    name="country"
                    value={
                      education.country || uniqueData?.editEducation?.country
                    }
                    data={[
                      { value: "Bangladeshi", label: "Bangladeshi" },
                      { value: "Indian", label: "Indian" },
                      { value: "Russian", label: "Russian" },
                      { value: "Amerian", label: "Amerian" },
                      { value: "Germany", label: "Germany" },
                      { value: "Brazil", label: "Brazil" },
                      { value: "Switzerland", label: "Switzerland" },
                    ]}
                    onChange={(event) =>
                      handleInputChange(event, setEducation, education)
                    }
                    style={{ marginBottom: 10 }}
                  />
                  <div className={styles.formInputField}>
                    <input
                      type="text"
                      placeholder="Major"
                      name="major"
                      defaultValue={
                        education.major || uniqueData?.editEducation?.major
                      }
                      onChange={(event) =>
                        handleInputChange(event, setEducation, education)
                      }
                      className={styles.inputField}
                    />
                  </div>
                  <Dropdown
                    placeholder="Year of completion"
                    name="compilition_year"
                    value={
                      education.compilition_year ||
                      uniqueData?.editEducation?.compilition_year
                    }
                    data={[
                      { value: "2010", label: "2010" },
                      { value: "2011", label: "2011" },
                      { value: "2012", label: "2012" },
                      { value: "2013", label: "2013" },
                      { value: "2014", label: "2014" },
                      { value: "2015", label: "2015" },
                    ]}
                    onChange={(event) =>
                      handleInputChange(event, setEducation, education)
                    }
                  />
                  <Box mt={2} className="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setIsEducationBtn(!isEducationBtn);
                        setIsAddButton(isAddButton === 0);
                        emptyFormHandler(setUniqueData);
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
                          setIsEducationBtn(!isEducationBtn);
                          updateUniqueInputData(
                            `/generator/educations/${uniqueData?.editEducation?.id}`,
                            educationEditData
                          );
                          loadInputData(
                            `/generator/educations`,
                            token,
                            setEducationData
                          );
                          emptyFormHandler(setEducation);
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
                          setIsEducationBtn(!isEducationBtn);
                          postInputData(
                            event,
                            `/generator/educations`,
                            education
                          );
                          loadInputData(
                            `/generator/educations`,
                            token,
                            setEducationData
                          );
                          setIsAddButton(isAddButton === 0);
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </div>
              )}
              <div className={styles.borderStyling}>
                {educationData?.Education?.map((education) => (
                  <div
                    style={{ marginTop: 20, marginBottom: 20 }}
                    key={education.id}
                  >
                    {!isEducationBtn && (
                      <div
                        style={{
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div>
                            <span style={{ marginRight: 10 }}>
                              {education.institute_type}{" "}
                            </span>
                            <span>{education.country}</span>
                          </div>
                          <div>
                            <span style={{ marginRight: 10 }}>
                              {education.major}{" "}
                            </span>
                            <span>{education.compilition_year}</span>
                          </div>
                        </div>
                        <div>
                          <EditIcon
                            className={styles.actionButtons}
                            onClick={() => {
                              loadUniqueInputData(
                                `/generator/educations/${education.id}/edit`
                              );
                              setIsEducationBtn(!isEducationBtn);
                            }}
                          />
                          <DeleteIcon
                            className={styles.actionButtons}
                            onClick={() => {
                              deleteUniqueInputData(
                                `/generator/educations/${education.id}`
                              );
                              loadInputData(
                                `/generator/educations`,
                                token,
                                setEducationData
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
          </Grid>

          {/* Education section end here  */}

          {/* Certification section start here  */}

          <Grid>
            <div className={styles.formHandle}>
              <Typography gutterBottom variant="subtitle2">
                Certificate
              </Typography>
              {!isCertificateBtn && (
                <div>
                  <Button
                    onClick={() => {
                      setIsCertificateBtn(!isCertificateBtn);
                      setIsAddButton(!isAddButton);
                    }}
                    style={{ color: "blue", background: "transparent" }}
                  >
                    Add new
                  </Button>
                </div>
              )}
            </div>
            <div>
              {isCertificateBtn && (
                <div>
                  <div className={styles.formInputField}>
                    <input
                      type="text"
                      placeholder="Award/Certificate"
                      name="certification_title"
                      defaultValue={
                        certificate.certification_title ||
                        uniqueData?.EditCertificate?.certification_title
                      }
                      onChange={(event) =>
                        handleInputChange(event, setCertificate, certificate)
                      }
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.formInputField}>
                    <input
                      type="text"
                      placeholder="Certificate from"
                      name="certified_by"
                      defaultValue={
                        certificate.certified_by ||
                        uniqueData?.EditCertificate?.certified_by
                      }
                      onChange={(event) =>
                        handleInputChange(event, setCertificate, certificate)
                      }
                      className={styles.inputField}
                    />
                  </div>
                  <Dropdown
                    placeholder="Year"
                    name="year"
                    value={
                      certificate.year || uniqueData?.EditCertificate?.year
                    }
                    data={[
                      { value: "2010", label: "2010" },
                      { value: "2011", label: "2011" },
                      { value: "2012", label: "2012" },
                      { value: "2013", label: "2013" },
                      { value: "2014", label: "2014" },
                      { value: "2015", label: "2015" },
                    ]}
                    onChange={(event) =>
                      handleInputChange(event, setCertificate, certificate)
                    }
                  />
                  <Box mt={2} className="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setIsCertificateBtn(!isCertificateBtn);
                        setIsAddButton(isAddButton === 0);
                        emptyFormHandler(setUniqueData);
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
                          setIsCertificateBtn(!isCertificateBtn);
                          updateUniqueInputData(
                            `/generator/certificates/${uniqueData?.EditCertificate?.id}`,
                            certificationEditData
                          );
                          loadInputData(
                            `/generator/certificates`,
                            token,
                            setCertificateData
                          );
                          emptyFormHandler(setCertificate);
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
                          setIsCertificateBtn(!isCertificateBtn);
                          postInputData(
                            event,
                            `/generator/certificates`,
                            certificate
                          );
                          loadInputData(
                            `/generator/certificates`,
                            token,
                            setCertificateData
                          );
                          emptyFormHandler(setCertificate);
                          setIsAddButton(isAddButton === 0);
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </div>
              )}
              <div className={styles.borderStyling}>
                {certificateData?.Certificate?.map((certificate) => (
                  <div
                    style={{ marginTop: 20, marginBottom: 20 }}
                    key={certificate.id}
                  >
                    {!isCertificateBtn && (
                      <div
                        style={{
                          marginBottom: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p style={{ marginRight: 10, marginBottom: 5 }}>
                            {certificate.certification_title}{" "}
                          </p>
                          <span>{certificate.certified_by} </span>
                          <span style={{ marginRight: 10 }}>
                            {certificate.year}
                          </span>
                        </div>
                        <div>
                          <EditIcon
                            className={styles.actionButtons}
                            onClick={() => {
                              loadUniqueInputData(
                                `/generator/certificates/${certificate.id}/edit`
                              );
                              setIsCertificateBtn(!isCertificateBtn);
                            }}
                          />
                          <DeleteIcon
                            className={styles.actionButtons}
                            onClick={() => {
                              deleteUniqueInputData(
                                `/generator/certificates/${certificate.id}`
                              );
                              loadInputData(
                                `/generator/certificates`,
                                token,
                                setCertificateData
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
          </Grid>

          {/* Certification section end here  */}

          {/* Requirements section start here  */}

          <div className={styles.formHandle}>
            <Typography gutterBottom variant="subtitle2">
              Skills
            </Typography>
            {!isSkillsBtn && (
              <div>
                <Button
                  onClick={() => {
                    setIsSkillsBtn(!isSkillsBtn);
                    setIsAddButton(!isAddButton);
                  }}
                  style={{ color: "blue", background: "transparent" }}
                >
                  Add new
                </Button>
              </div>
            )}
          </div>
          <div>
            <div>
              {isSkillsBtn && (
                <div>
                  <input
                    type="text"
                    placeholder="Add skills"
                    name="skill"
                    defaultValue={skills.skill || uniqueData?.EditSkill?.skill}
                    onChange={() => handleInputChange(event, setSkills, skills)}
                    className={styles.inputField}
                  />
                  <Box mt={2} className="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setIsSkillsBtn(!isSkillsBtn);
                        setIsAddButton(isAddButton === 0);
                        emptyFormHandler(setUniqueData);
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
                          setIsSkillsBtn(!isSkillsBtn);
                          updateUniqueInputData(
                            `/generator/skills/${uniqueData.EditSkill?.id}`,
                            skillEditData
                          );
                          emptyFormHandler(setSkills);
                          loadInputData(
                            `/generator/skills`,
                            token,
                            setSkillsData
                          );
                        }}
                      >
                        Update
                      </Button>
                    )}
                    {isAddButton && isSkillsBtn && (
                      <Button
                        style={{ marginLeft: 12 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setIsSkillsBtn(!isSkillsBtn);
                          postInputData(event, `/generator/skills`, skills);
                          loadInputData(
                            `/generator/skills`,
                            token,
                            setSkillsData
                          );
                          setIsAddButton(isAddButton === 0);
                          emptyFormHandler(setSkills);
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </div>
              )}
            </div>
          </div>
          <div className={styles.borderStyling}>
            {skillsData?.Skill?.map((skill) => (
              <div style={{ display: "inline-block" }} key={skill.id}>
                {!isSkillsBtn && (
                  <div className={styles.skillContainer}>
                    <label className={styles.tagLevel}>{skill.skill}</label>
                    <div className={styles.modifyButtons}>
                      <EditIcon
                        className={styles.actionButtons}
                        onClick={() => {
                          loadUniqueInputData(
                            `/generator/skills/${skill.id}/edit`
                          );
                          setIsSkillsBtn(!isSkillsBtn);
                        }}
                      />
                      <DeleteIcon
                        className={styles.actionButtons}
                        onClick={() => {
                          deleteUniqueInputData(
                            `/generator/skills/${skill.id}`
                          );
                          loadInputData(
                            `/generator/skills`,
                            token,
                            setSkillsData
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      {/* button */}
    </Box>
  );
};

export default ProfileForm;
