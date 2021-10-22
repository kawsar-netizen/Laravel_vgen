import styles from "./PostedJobcard.module.css";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { Box, Button, Typography } from "@material-ui/core";
import Link from "next/link";
import { getData } from "../../../handler/apiHandler";
import Modal from "react-modal";
import JobDetailsModal from "../../views/Modal/Modal";
import cookie from "js-cookie";
import { useState } from "react";
// import { UserContext } from "../../../context/UserContext";
import BIdConfirmation from "../../views/Modal/BIdConfirmation";
import { server } from "../../../config";
// Modal.setAppElement('#postedJobCard')

const PostedJobcardRight = ({ jobDetails, job, bid, bidConfirmation }) => {
  // const [bidConfirmation, setBidConfirmation] = useContext(UserContext);

  console.log(bidConfirmation);
  const customStyles = {
    content: {
      // top: '50%',
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      width: "40%",
      margin: "auto",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };
  const customStyles2 = {
    content: {
      width: "40%",
      height: "300px",
      margin: "auto",
      border: "none",
    },
  };

  console.log(bid);
  const [viewJobDetails, setViewJobDetails] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bidMessage, setBidMessage] = useState("");

  const fetchJobDetails = () => {
    const userInfo = cookie.get("generatorUser");
    getData(`/generator/job/${bid.jobId}/details`, userInfo).then((result) => {
      let response = result;
      console.log(response);
      setViewJobDetails(response?.data?.job);
    });
  };

  const fetchBidJobMessage = () => {
    const userInfo = cookie.get("generatorUser");
    if (bidConfirmation?.youBidHere) {
      getData(`/${bidConfirmation?.youBidHere}`, userInfo).then((result) => {
        let response = result;
        console.log(response);
        setBidMessage(response?.apply);
      });
    }
    if (job?.youBidHere) {
      getData(`/${job?.youBidHere}`, userInfo).then((result) => {
        let response = result;
        console.log(response);
        setBidMessage(response?.apply);
      });
    }
  };
  console.log(viewJobDetails);
  return (
    <div className={styles.postedJobcardRight} id="postedJobCard">
      <div className="flex-between">
        <Box className="flex">
          <Typography gutterBottom variant="h6">
            Searching For A
          </Typography>
          <Typography
            className="ml-5"
            color="primary"
            gutterBottom
            variant="h6"
          >
            {bidConfirmation?.title
              ? bidConfirmation?.title
              : jobDetails?.jobTitle || job?.title || bid?.title}
          </Typography>
        </Box>
        <Typography style={{ color: "#3cb1e8" }} variant="subtitle1">
          {jobDetails?.jobId ||
            job?.jobId ||
            bid?.jobId ||
            bidConfirmation?.jobId}
        </Typography>
      </div>
      <Box mb={2}>
        <Button variant="outlined">
          {jobDetails?.jobType ||
            job?.job_type ||
            bid?.job_type ||
            bidConfirmation?.job_type}
        </Button>
      </Box>
      <p>
        I Am Looking For A{" "}
        <strong>
          {jobDetails?.jobTitle ||
            job?.title ||
            bid?.title ||
            bidConfirmation?.title}
        </strong>{" "}
        Who Can Work For Me
      </p>
      <div className="flex">
        <AccountBalanceWalletIcon className="mr-5" fontSize="small" />{" "}
        <Typography variant="body1" style={{ marginRight: 10 }}>
          Budget:{" "}
        </Typography>
        <Typography variant="body1">
          {jobDetails?.budgetRange ||
            job?.budget ||
            bid?.budget ||
            bidConfirmation?.budget}{" "}
          $
        </Typography>
      </div>
      <div className="flex" style={{ marginBottom: 20 }}>
        <WatchLaterIcon className="mr-5" fontSize="small" />{" "}
        <Typography variant="body1" style={{ marginRight: 10 }}>
          Duration:{" "}
        </Typography>
        <Typography variant="body1">
          {" "}
          {jobDetails?.time ||
            job?.duration ||
            bid?.duration ||
            bidConfirmation?.duration}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          {(job?.jobPostedTime || bid?.jobPostedTime) &&
            !bidConfirmation?.title && (
              <Typography color="secondary" variant="body1">
                <strong>Job posted {job?.jobPostedTime || bid?.jobPostedTime}</strong>
              </Typography>
            )}
          {bidConfirmation?.title && (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                setModalIsOpen(true);
                fetchBidJobMessage();
              }}
            >
              Yod bid here
            </Button>
          )}
        </div>
        <div>
          {job?.BidForIt ? (
            <Link
              href="/valuegenerator/dashboard/bid/[id]"
              as={`/valuegenerator/dashboard/bid/${job?.jobId}`}
            >
              <Button size="small" variant="contained" color="primary">
                Bid for it
              </Button>
            </Link>
          ) : job?.youBidHere ? (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => {
                setModalIsOpen(true);
                fetchBidJobMessage();
              }}
            >
              You Bid Here
            </Button>
          ) : bid && !bidConfirmation?.title ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                fetchJobDetails();
                setModalIsOpen(true);
              }}
            >
              View Job Details
            </Button>
          ) : bidConfirmation?.title ? (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              View Request
            </Button>
          ) : (
            <Link
              href={`/valueseeker/dashboard/editPostedJob/[id]`}
              as={`/valueseeker/dashboard/editPostedJob/${jobDetails?.jobId}`}
            >
              <Button size="small" color="secondary">
                Edit post
              </Button>
            </Link>
          )}
        </div>
      </div>
      {viewJobDetails?.description && !bidConfirmation?.title && (
        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
        >
          <JobDetailsModal
            key={viewJobDetails?.clientImg}
            viewJobDetails={viewJobDetails}
            setModalIsOpen={setModalIsOpen}
          />
        </Modal>
      )}
      {bidConfirmation?.title ||
        (job?.youBidHere && (
          <Modal
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={false}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles2}
          >
            <BIdConfirmation
              bidConfirmation={bidConfirmation}
              bidMessage={bidMessage}
              setModalIsOpen={setModalIsOpen}
            />
          </Modal>
        ))}
    </div>
  );
};

export default PostedJobcardRight;
