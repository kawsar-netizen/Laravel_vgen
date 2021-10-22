import styles from "./LandingPage.module.css";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { UserContext } from "../../../context/UserContext";
import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import cookie from 'js-cookie'
const LandingPageHeader = () => {

  const [cookieHandler, setCookieHandler] = useState('')
  const [seekerUser, setSeekerUser] = useState([]);
  const [generatorUser, setGeneratorUser] = useState([]);
  const [adminUser, setAdminUser] = useState([]);
  const [parsedUserInfo, setParsedUserInfo] = useState([]);

  useEffect(() => {
    const seekerCookie = cookie.get('seekerUser')
    const generatorCookie = cookie.get('generatorUser')
    const adminCookie = cookie.get('adminUser')
    const webStorage = sessionStorage || localStorage;
    if (webStorage.adminUser) {
      const adminInfo = JSON.parse(webStorage.getItem("adminUser"));
      setParsedUserInfo(adminInfo?.data?.user);
      // console.log(adminInfo);
    }
    if (webStorage.seekerUser) {
      const seekerInfo = JSON.parse(webStorage.getItem("seekerUser"));
      setParsedUserInfo(seekerInfo?.data?.user);
      // console.log(seekerInfo);
    }
    if (webStorage.generatorUser) {
      const generatorInfo = JSON.parse(webStorage.getItem("generatorUser"));
      setParsedUserInfo(generatorInfo?.data?.user);
      // console.log(generatorInfo);
    }
    setSeekerUser(webStorage);
    setGeneratorUser(webStorage);
    setAdminUser(webStorage);

    if(seekerCookie){
      setCookieHandler('seekerUser')
    }
    if(generatorCookie){
      setCookieHandler('generatorUser')
    }
    if(adminCookie){
      setCookieHandler('adminUser')
    }
  }, []);

  const adminInfo = adminUser.adminUser && cookieHandler === "adminUser"
  const adminInfo2 = adminUser.adminUser || cookieHandler === "adminUser"

  const seekerInfo = seekerUser.seekerUser && cookieHandler === "seekerUser"
  const seekerInfo2 = seekerUser.seekerUser || cookieHandler === "seekerUser"

  const generatorInfo = generatorUser.generatorUser && cookieHandler === "generatorUser"
  const generatorInfo2 = generatorUser.generatorUser || cookieHandler === "generatorUser"

  const storeUser = (adminInfo || adminInfo2) ||
  (seekerInfo || seekerInfo2) || (generatorInfo || generatorInfo2)
   
  console.log(parsedUserInfo);

  return (
    <div className={styles.landingpage_header}>
      <div className={styles.navbar}>
        <img
          src="/assets/images/Icons/vgenlogo.png"
          className={styles.logo}
          alt="vgen"
        />
        <div className={styles.navbarRight}>
          <div className={styles.navbarRight_login}>
            {storeUser ? (
              <div>
                {(adminInfo || adminInfo2) && (
                  <div className={styles.userHighlight}>
                    <Link href="/admin/dashboard"> Admin Dashboard</Link>
                    <div className={styles.userInfoHightight}>
                      <AccountCircle />
                      <strong style={{ color: "cyan", marginLeft: 10 }}>
                        {parsedUserInfo?.user_name || <>Logged In</>}
                      </strong>
                    </div>
                  </div>
                )}
                {(seekerInfo || seekerInfo2) && (
                  <div className={styles.userHighlight}>
                    <Link href="/valueseeker/dashboard"> Seeker Dashboard</Link>
                    <div className={styles.userInfoHightight}>
                      <AccountCircle />
                      <strong style={{ color: "cyan", marginLeft: 10 }}>
                        {parsedUserInfo?.user_name || <>Logged In</>}
                      </strong>
                    </div>
                  </div>
                )}
                {(generatorInfo || generatorInfo2) && (
                  <div className={styles.userHighlight}>
                    <Link href="/valuegenerator/dashboard">
                      Generator Dashboard
                    </Link>
                    <div className={styles.userInfoHightight}>
                      <AccountCircle />
                      <strong style={{ color: "cyan", marginLeft: 10 }}>
                        {parsedUserInfo?.user_name || <>Logged In</>}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Link href="/admin/login">Login as admin</Link>
                <Link href="/valueseeker/login">Value Seeker</Link>
                <Link href="/valuegenerator/login">Value Generator</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.headerMidContent}>
        <Typography variant="h3">A Proper Workplace</Typography>
        <Typography variant="subtitle1">
          Find Job with your prefferable skill
        </Typography>
      </div>
      <Container maxWidth="sm">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Card
              style={{
                maxWidth: "200px",
                backgroundColor: "#c1c1c1",
                padding: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom variant="h4">
                  30700
                </Typography>
                <Image
                  src="/assets/images/Icons/Icon awesome-user-alt.svg"
                  height="30px"
                  width="30px"
                  alt="user"
                />
              </div>
              <Typography variant="subtitle2"> Registerd Users</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              style={{
                maxWidth: "200px",
                backgroundColor: "#c1c1c1",
                padding: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom variant="h4">
                  2500+
                </Typography>
                <Image
                  src="/assets/images/Icons/Icon awesome-project-diagram.svg"
                  height="30px"
                  width="30px"
                  alt="user"
                />
              </div>
              <Typography variant="subtitle2"> Running Projects</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <div style={{ marginTop: "5rem", textAlign: "center" }}>
        <Link href="/valuegenerator/signup">
          <Button variant="contained" color="primary">
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageHeader;
